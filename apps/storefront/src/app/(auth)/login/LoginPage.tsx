'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPaw } from 'react-icons/fa6';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/shared/Spinner';
import styles from '../auth.module.css';

/* Official Google G logo — inline SVG per Google brand guidelines */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Honour middleware redirect — only relative paths allowed (security)
  const redirectTo = (() => {
    const r = searchParams.get('redirectTo') ?? '/account';
    return r.startsWith('/') ? r : '/account';
  })();

  // Surface OAuth callback errors
  const callbackError = searchParams.get('error');

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState(callbackError ? 'Sign-in failed. Please try again.' : '');
  const [loading, setLoading]         = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  /* ── Email / password sign-in ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  /* ── Google OAuth ── */
  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaPaw size={24} style={{ color: 'var(--color-amber)' }} /> Furlivo
          </Link>
        </div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading || oauthLoading}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading || oauthLoading}
            />
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <div className={styles.forgotWrap}>
            <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading || oauthLoading}
          >
            {loading ? <><Spinner size="sm" color="white" /> Signing in…</> : 'Sign In'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className={styles.link}>Create one</Link>
        </p>

        <div className={styles.divider}><span>or</span></div>

        <button
          id="google-signin-btn"
          className={`btn btn-ghost btn-full ${styles.oauthBtn}`}
          disabled={oauthLoading || loading}
          onClick={handleGoogleSignIn}
          type="button"
        >
          {oauthLoading
            ? <><Spinner size="sm" color="dark" /> Redirecting…</>
            : <><GoogleIcon /> Continue with Google</>}
        </button>
      </div>
    </div>
  );
}
