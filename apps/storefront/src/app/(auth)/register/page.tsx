'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPaw } from 'react-icons/fa6';
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/shared/Spinner';
import styles from '../auth.module.css';
import regStyles from './register.module.css';

/* ─── Password strength helpers ─────────────────────────── */
interface StrengthResult {
  score: 0 | 1 | 2 | 3;          // 0=empty 1=weak 2=fair 3=strong
  label: string;
  color: string;
  width: string;
}

function getStrength(password: string): StrengthResult {
  if (!password) return { score: 0, label: '', color: 'transparent', width: '0%' };

  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) || /\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Clamp to 1-3
  const clamped = Math.min(3, Math.max(1, Math.ceil(score * 3 / 4))) as 1 | 2 | 3;

  const map: Record<1 | 2 | 3, StrengthResult> = {
    1: { score: 1, label: 'Weak',   color: '#ef4444', width: '33%'  },
    2: { score: 2, label: 'Fair',   color: '#f59e0b', width: '66%'  },
    3: { score: 3, label: 'Strong', color: '#10b981', width: '100%' },
  };

  return map[clamped];
}

/* ─── Component ─────────────────────────────────────────── */
type Stage = 'idle' | 'loading' | 'confirm_email';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });
  const [error, setError]   = useState('');
  const [stage, setStage]   = useState<Stage>('idle');

  const strength = useMemo(() => getStrength(form.password), [form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent double-submission
    if (stage === 'loading') return;
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!/[A-Z\d!@#$%^&*]/.test(form.password)) {
      setError('Password must contain at least one uppercase letter, number, or special character.');
      return;
    }

    setStage('loading');
    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { first_name: form.firstName, last_name: form.lastName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/account`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setStage('idle');
      return;
    }

    // If Supabase email confirmation is enabled, `session` will be null.
    // Show the "check your inbox" screen instead of pushing to /account.
    if (data.session) {
      // Do NOT call router.refresh() — it races push() and freezes the UI.
      router.push('/account');
    } else {
      setStage('confirm_email');
    }
  };

  /* ── Email confirmation screen ── */
  if (stage === 'confirm_email') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaPaw size={24} style={{ color: 'var(--orange)' }} /> Furlivo
            </Link>
          </div>
          <div className={regStyles.successIcon} style={{ color: 'var(--orange)' }}>
            <HiOutlineEnvelopeOpen size={64} />
          </div>
          <h1 className={styles.title}>Check your inbox</h1>
          <p className={styles.subtitle}>
            We sent a confirmation link to <strong>{form.email}</strong>.
            Click it to activate your account, then come back to sign in.
          </p>
          <p className={styles.switchLink}>
            <Link href="/login" className={styles.link}>Back to Sign In</Link>
          </p>
        </div>
      </div>
    );
  }

  /* ── Registration form ── */
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaPaw size={24} style={{ color: 'var(--orange)' }} /> Furlivo
          </Link>
        </div>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join 12,000+ pet parents</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-first">First Name</label>
              <input
                id="reg-first" name="firstName" type="text" className="input"
                placeholder="Jane" value={form.firstName} onChange={handleChange}
                required disabled={stage === 'loading'}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-last">Last Name</label>
              <input
                id="reg-last" name="lastName" type="text" className="input"
                placeholder="Doe" value={form.lastName} onChange={handleChange}
                required disabled={stage === 'loading'}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email" name="email" type="email" className="input"
              placeholder="you@example.com" value={form.email} onChange={handleChange}
              required autoComplete="email" disabled={stage === 'loading'}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password" name="password" type="password" className="input"
              placeholder="Min 8 characters" value={form.password} onChange={handleChange}
              required autoComplete="new-password" disabled={stage === 'loading'}
            />
            {/* ── Password strength bar ── */}
            {form.password && (
              <div className={regStyles.strengthWrap} aria-live="polite">
                <div className={regStyles.strengthTrack}>
                  <div
                    className={regStyles.strengthFill}
                    style={{ width: strength.width, background: strength.color }}
                  />
                </div>
                <span className={regStyles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm" name="confirmPassword" type="password" className="input"
              placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange}
              required autoComplete="new-password" disabled={stage === 'loading'}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={stage === 'loading'}
          >
            {stage === 'loading'
              ? <><Spinner size="sm" color="white" /> Creating account…</>
              : 'Create Account'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
