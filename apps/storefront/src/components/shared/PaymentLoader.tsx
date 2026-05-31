import styles from './PaymentLoader.module.css';

interface PaymentLoaderProps {
  title?:    string;
  subtitle?: string;
}

/**
 * Modal overlay shown while a payment is being processed.
 * Renders above the checkout form to prevent accidental interaction.
 */
export default function PaymentLoader({
  title    = 'Processing Payment',
  subtitle = 'Please wait — do not close or refresh this page.',
}: PaymentLoaderProps) {
  return (
    <div className={styles.overlay} role="status" aria-live="assertive" aria-label={title}>
      <div className={styles.card}>
        {/* Pulsing ring + spinner */}
        <div className={styles.iconWrap}>
          <div className={styles.pulseRing} aria-hidden="true" />
          <div className={styles.ringSpinner} aria-hidden="true" />
        </div>

        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>

        {/* Animated progress strip */}
        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>

        {/* Secure badge */}
        <div className={styles.secure}>
          <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          256-bit SSL Secured
        </div>
      </div>
    </div>
  );
}
