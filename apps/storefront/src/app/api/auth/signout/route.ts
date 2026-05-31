import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/auth/signout
 *
 * Signs the user out server-side so the Supabase session cookie is properly
 * cleared. The client's SignOutButton POSTs here before redirecting.
 *
 * Using a server-side route (rather than client.auth.signOut()) ensures the
 * cookie is wiped even if the client-side JS fails or is blocked.
 */
export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_STOREFRONT_URL ?? 'http://localhost:3000'),
    { status: 302 }
  );
}
