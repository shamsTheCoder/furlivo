'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/Spinner';
import { useAuth } from '@/components/layout/AuthProvider';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import styles from './account.module.css';

/**
 * SignOutButton
 *
 * POSTs to /api/auth/signout which calls supabase.auth.signOut() server-side,
 * clearing the session cookie. After a successful response the user is pushed
 * to /login and the router is refreshed so Server Components re-render.
 */
export default function SignOutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading]  = useState(false);
  const [error, setError]      = useState('');
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch {
      setError('Could not sign out. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.signoutWrap}>
      {error && <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: '0.5rem' }}>{error}</p>}
      <button
        id="sign-out-btn"
        className="btn btn-ghost"
        onClick={handleSignOut}
        disabled={loading}
        style={{ gap: '8px' }}
      >
        {loading ? <><Spinner size="sm" color="dark" /> Signing out…</> : <><HiOutlineArrowRightOnRectangle size={18} /> Sign Out</>}
      </button>
    </div>
  );
}
