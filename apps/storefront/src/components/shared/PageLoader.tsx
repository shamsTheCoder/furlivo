import styles from './PageLoader.module.css';

interface PageLoaderProps {
  label?: string;
}

/**
 * Full-screen loading overlay — use while the cart/checkout is hydrating,
 * or any other async boundary that blocks the whole page.
 */
export default function PageLoader({ label = 'Loading…' }: PageLoaderProps) {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label={label}>
      {/* Top progress bar */}
      <div className={styles.progress}>
        <div className={styles.progressBar} />
      </div>

      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.paw}>🐾</div>
        Furlivo
      </div>

      {/* Ring spinner */}
      <div className={styles.ring} aria-hidden="true" />

      {/* Label */}
      <p className={styles.label}>{label}</p>
    </div>
  );
}
