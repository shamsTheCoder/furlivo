import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { type AdminRole, hasPermission, isValidAdminRole, type Permission } from '@/lib/rbac';

// ─── Route Configuration ──────────────────────────────────────────────────────

const AUTH_ROUTES = ['/login'];

const PROTECTED_ROUTES: Array<{ pattern: RegExp; permission: Permission }> = [
  { pattern: /^\/team(\/|$)/,      permission: 'view:team' },
  { pattern: /^\/settings(\/|$)/, permission: 'view:settings' },
  { pattern: /^\/analytics(\/|$)/, permission: 'view:analytics' },
  { pattern: /^\/marketing(\/|$)/, permission: 'view:marketing' },
];

// ─── JWT Claim Reader ─────────────────────────────────────────────────────────
// After getUser() cryptographically validates the token, we decode the
// already-trusted JWT to read custom claims — zero extra DB call.

function parseJwtClaims(accessToken: string): Record<string, unknown> {
  try {
    const base64 = accessToken.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
  } catch {
    return {};
  }
}

// ─── Session Invalidation Helper ─────────────────────────────────────────────

function clearSessionCookies(response: NextResponse, request: NextRequest): NextResponse {
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.set(cookie.name, '', { maxAge: 0, path: '/' });
    }
  });
  return response;
}

// ─── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // ── Step 1: Session management client (anon key, handles cookie refresh) ────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          // Step A: patch request cookies for downstream middleware
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // Step B: rebuild supabaseResponse so refreshed cookies are sent to browser
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() makes a network call to Supabase to cryptographically validate
  // the JWT. This is intentional — it prevents forged tokens.
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // ── Step 2: Unauthenticated → redirect to /login ───────────────────────────
  if ((!user || userError) && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // ── Step 3: Authenticated on /login → redirect to dashboard ───────────────
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // ── Step 4: RBAC — read role from JWT custom claim (no DB call) ─────────────
  // The JWT was already validated in Step 1. We decode its payload to read
  // the `app_role` claim embedded by the `custom_access_token_hook` DB function.
  if (user) {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    let role: string | undefined;
    if (accessToken) {
      const claims = parseJwtClaims(accessToken);
      role = typeof claims.app_role === 'string' ? claims.app_role : undefined;
    }

    // ── Step 5: Block non-admin roles ─────────────────────────────────────────
    if (!isValidAdminRole(role)) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', 'Access denied. You do not have admin privileges.');
      return clearSessionCookies(NextResponse.redirect(url), request);
    }

    const adminRole: AdminRole = role;

    // ── Step 6: Route-level permission guard ──────────────────────────────────
    const routeGuard = PROTECTED_ROUTES.find(({ pattern }) => pattern.test(pathname));
    if (routeGuard && !hasPermission(adminRole, routeGuard.permission)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('error', 'You do not have permission to access that page.');
      return NextResponse.redirect(url);
    }

    // ── Step 7: Stamp role onto request headers for Server Components ─────────
    // Build a new request with the validated role header. This is server-set
    // and cannot be injected by the client.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-admin-role', adminRole);

    const finalResponse = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // Forward any Supabase session cookies (e.g. refreshed access token)
    supabaseResponse.cookies.getAll().forEach(({ name, value, ...opts }) => {
      finalResponse.cookies.set(name, value, opts as any);
    });

    return finalResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
