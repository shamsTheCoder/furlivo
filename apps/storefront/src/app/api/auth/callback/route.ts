import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/auth/callback
 *
 * Handles the OAuth / magic-link / password-reset redirect from Supabase.
 * Supabase sends a `code` query param; we exchange it for a session here,
 * then redirect the user to `next` (default: /account).
 *
 * All OAuth providers AND email confirmation links MUST point to this route.
 * e.g. redirectTo: `${origin}/api/auth/callback?next=/account`
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Ensure we only redirect to relative paths (security: no open redirect)
      const safeNext = next.startsWith('/') ? next : '/account';
      return NextResponse.redirect(`${origin}${safeNext}`);
    }

    console.error('[auth/callback] exchangeCodeForSession error:', error.message);
  }

  // If code is missing or exchange failed, send to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
