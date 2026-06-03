import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { isValidAdminRole } from '@/lib/rbac';

// ─── Rate Limiter — In-Memory Sliding Window ──────────────────────────────────
// Works correctly in single-instance deployments (VPS, Docker, etc.).
// For Vercel/Edge serverless, swap this Map for Upstash Redis.

interface AttemptRecord {
  count:   number;
  resetAt: number; // epoch ms
}

const attempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS  = 5;
const WINDOW_MS     = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS    = 30 * 60 * 1000; // 30 minutes after max exceeded

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    // Fresh window
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  record.count += 1;
  return { allowed: true };
}

function recordSuccess(ip: string) {
  // Clear the counter on successful login (prevents lockout after a bad streak)
  attempts.delete(ip);
}

function recordFailure(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (record) {
    record.count += 1;
    // If max exceeded, extend the lockout window
    if (record.count >= MAX_ATTEMPTS) {
      record.resetAt = now + LOCKOUT_MS;
    }
  }
}

// ─── CORS / Origin guard ──────────────────────────────────────────────────────

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? '';
  // Allow requests from the admin domain and localhost in dev
  if (!origin) return true; // same-origin requests have no Origin header
  return (
    origin === adminUrl ||
    origin === 'http://localhost:3001' ||
    origin.startsWith('http://localhost:')
  );
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Origin check (CSRF guard)
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(ip);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${Math.ceil((rateCheck.retryAfterSec ?? 900) / 60)} minutes.` },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfterSec ?? 900),
          'X-RateLimit-Limit': String(MAX_ATTEMPTS),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // Parse body
  let email: string, password: string;
  try {
    const body = await request.json();
    email    = String(body.email    ?? '').trim().toLowerCase();
    password = String(body.password ?? '');
    if (!email || !password) throw new Error('Missing fields');
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Build a server-side Supabase client to authenticate
  let supabaseResponse = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[]) => {
          supabaseResponse = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as any)
          );
        },
      },
    }
  );

  // Attempt authentication
  const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError || !data.user) {
    recordFailure(ip);
    return NextResponse.json(
      { error: signInError?.message ?? 'Invalid email or password.' },
      { status: 401 }
    );
  }

  // RBAC check — verify the user has an admin-level role
  // Read from the JWT's app_role claim (set by our DB hook)
  const accessToken = data.session?.access_token ?? '';
  let jwtRole: string | undefined;
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/') ?? '', 'base64').toString('utf-8')
    );
    jwtRole = payload?.app_role as string | undefined;
  } catch {
    jwtRole = undefined;
  }

  if (!isValidAdminRole(jwtRole)) {
    // Sign out immediately — this user has no business in the admin panel
    await supabase.auth.signOut();
    recordFailure(ip);
    return NextResponse.json(
      { error: 'Access denied. You do not have admin privileges.' },
      { status: 403 }
    );
  }

  // Success
  recordSuccess(ip);

  const okResponse = NextResponse.json({ success: true, role: jwtRole }, { status: 200 });

  // Forward session cookies to the browser
  supabaseResponse.cookies.getAll().forEach(({ name, value, ...opts }) => {
    okResponse.cookies.set(name, value, opts as any);
  });

  return okResponse;
}
