'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/shared/Spinner';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { first_name: form.firstName, last_name: form.lastName },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/account');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Link href="/">🐾 Furlivo</Link>
        </div>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join 12,000+ pet parents</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-first">First Name</label>
              <input id="reg-first" name="firstName" type="text" className="input" placeholder="Jane" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-last">Last Name</label>
              <input id="reg-last" name="lastName" type="text" className="input" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-email">Email</label>
            <input id="reg-email" name="email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={handleChange} required autoComplete="email" />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" name="password" type="password" className="input" placeholder="Min 8 characters" value={form.password} onChange={handleChange} required autoComplete="new-password" />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-confirm">Confirm Password</label>
            <input id="reg-confirm" name="confirmPassword" type="password" className="input" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} required autoComplete="new-password" />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? <><Spinner size="sm" color="white" /> Creating account…</> : 'Create Account'}
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
