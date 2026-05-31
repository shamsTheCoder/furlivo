'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaPaw } from 'react-icons/fa6';
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/shared/Spinner';
import styles from '../auth.module.css';
import fpStyles from './forgot-password.module.css';

type Stage = 'idle' | 'loading' | 'success' | 'error';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStage('loading');
    setErrorMsg('');

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback?next=/account/settings`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setErrorMsg(error.message);
      setStage('error');
      return;
    }

    setStage('success');
  };

  if (stage === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaPaw size={24} style={{ color: 'var(--color-amber)' }} /> Furlivo
            </Link>
          </div>
          <div className={fpStyles.successIcon} style={{ color: 'var(--color-amber)' }}>
            <HiOutlineEnvelopeOpen size={64} />
          </div>
          <h1 className={styles.title}>Check your inbox</h1>
          <p className={styles.subtitle}>
            We sent a password reset link to <strong>{email}</strong>. Check your spam folder too.
          </p>
          <p className={styles.switchLink}>
            <Link href="/login" className={styles.link}>Back to Sign In</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaPaw size={24} style={{ color: 'var(--color-amber)' }} /> Furlivo
          </Link>
        </div>
        <h1 className={styles.title}>Reset password</h1>
        <p className={styles.subtitle}>
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="fp-email">Email</label>
            <input
              id="fp-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={stage === 'loading'}
            />
          </div>

          {stage === 'error' && <p className={styles.error}>{errorMsg}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={stage === 'loading'}
          >
            {stage === 'loading'
              ? <><Spinner size="sm" color="white" /> Sending…</>
              : 'Send Reset Link'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Remembered it?{' '}
          <Link href="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
