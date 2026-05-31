'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FiAlertTriangle size={40} />
      </div>
      <h2 className={styles.title}>Something went wrong!</h2>
      <p className={styles.description}>
        An unexpected error occurred. We have been notified and are looking into it.
      </p>
      <div className={styles.actions}>
        <button className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
        <a href="/" className="btn btn-secondary">
          Go Home
        </a>
      </div>
    </div>
  );
}
