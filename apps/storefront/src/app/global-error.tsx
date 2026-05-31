'use client';

import { FiAlertTriangle } from 'react-icons/fi';
import styles from './error.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <div className={styles.iconWrapper}>
            <FiAlertTriangle size={40} />
          </div>
          <h2 className={styles.title}>Something went wrong!</h2>
          <p className={styles.description}>
            A critical error occurred. We have been notified and are looking into it.
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
      </body>
    </html>
  );
}
