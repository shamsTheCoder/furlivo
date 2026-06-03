'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PiPawPrintFill } from 'react-icons/pi';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Honor middleware redirect (only relative paths for security)
  const redirectTo = (() => {
    const r = searchParams.get('redirectTo') ?? '/';
    return r.startsWith('/') && !r.startsWith('//') ? r : '/';
  })();

  // Surface errors passed from middleware (e.g. access denied on stale session)
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(searchParams.get('error') ?? '');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      // Use our rate-limited server route instead of calling Supabase directly.
      // This enforces: brute-force protection, CSRF check, and RBAC validation
      // — all server-side, before the session cookie is set in the browser.
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
        // Include cookies so Supabase can persist the session
        credentials: 'same-origin',
      });

      const data: { success?: boolean; error?: string } = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Sign-in failed. Please try again.');
        setLoading(false);
        return;
      }

      // Session cookie is now set. Navigate to the dashboard.
      // router.push causes a full navigation — middleware will validate the
      // new session and role before the page renders.
      router.push(redirectTo);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '8px',
              fontSize:       '1.25rem',
              fontWeight:     700,
            }}
          >
            <PiPawPrintFill size={28} style={{ color: 'var(--orange)' }} />
            Furlivo Admin
          </div>
        </div>
        <h1 className={styles.title}>Admin Access</h1>
        <p className={styles.subtitle}>Sign in to manage your store</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="input"
              placeholder="admin@furlivo.shop"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {error && (
            <p className={styles.error} role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <button
            type="submit"
            id="admin-signin-btn"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
