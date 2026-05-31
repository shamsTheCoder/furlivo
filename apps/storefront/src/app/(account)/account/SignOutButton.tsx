'use client';

import { useState, useEffect, useRef } from 'react';
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
 * to /login.
 */
export default function SignOutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const router = useRouter();

  // isMounted ref prevents setState being called after router.push() triggers
  // unmount — fixes Leak 4.
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const handleSignOut = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut();
      // router.refresh() removed — causes redundant full server re-render.
      // The middleware already handles redirect for unauthenticated users.
      router.push('/login');
    } catch {
      // Guard: component may have already unmounted if navigation started
      if (isMounted.current) {
        setError('Could not sign out. Please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.signoutWrap}>
      {error && (
        <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: '0.5rem' }}>
          {error}
        </p>
      )}
      <button
        id="sign-out-btn"
        className="btn btn-ghost"
        onClick={handleSignOut}
        disabled={loading}
        style={{ gap: '8px' }}
      >
        {loading
          ? <><Spinner size="sm" color="dark" /> Signing out…</>
          : <><HiOutlineArrowRightOnRectangle size={18} /> Sign Out</>
        }
      </button>
    </div>
  );
}
