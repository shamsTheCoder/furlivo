'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/Spinner';
import styles from './account.module.css';

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signoutWrap}>
      <button
        className="btn btn-ghost"
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? <><Spinner size="sm" color="dark" /> Signing out…</> : 'Sign Out'}
      </button>
    </div>
  );
}
