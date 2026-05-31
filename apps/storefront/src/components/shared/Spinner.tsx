import styles from './Spinner.module.css';

type Size  = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'orange' | 'white' | 'dark';
type Variant = 'ring' | 'dots';

interface SpinnerProps {
  size?:    Size;
  color?:   Color;
  variant?: Variant;
  className?: string;
}

export default function Spinner({
  size    = 'md',
  color   = 'orange',
  variant = 'ring',
  className,
}: SpinnerProps) {
  if (variant === 'dots') {
    return (
      <span
        className={`${styles.dots} ${className ?? ''}`}
        style={{ color: color === 'orange' ? 'var(--orange)' : color === 'white' ? '#fff' : 'var(--dark)' }}
        role="status"
        aria-label="Loading…"
      >
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </span>
    );
  }

  return (
    <span
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className ?? ''}`}
      role="status"
      aria-label="Loading…"
    />
  );
}
