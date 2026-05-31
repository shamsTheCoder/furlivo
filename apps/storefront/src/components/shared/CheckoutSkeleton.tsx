import styles from './CheckoutSkeleton.module.css';

/** Skeleton UI that mirrors the CheckoutPageClient layout during hydration. */
export default function CheckoutSkeleton() {
  return (
    <div className={`container ${styles.page}`}>
      {/* Brand header */}
      <div className={`skeleton ${styles.header}`} />

      <div className={styles.layout}>
        {/* Left: form sections */}
        <div className={styles.form}>
          {/* Contact details */}
          <div className={styles.section}>
            <div className={`skeleton ${styles.sectionTitle}`} />
            <div className={`skeleton ${styles.field}`} />
          </div>

          {/* Shipping */}
          <div className={styles.section}>
            <div className={`skeleton ${styles.sectionTitle}`} />
            <div className={styles.fieldGrid}>
              <div className={`skeleton ${styles.field}`} />
              <div className={`skeleton ${styles.field}`} />
              <div className={`skeleton ${styles.fieldFull}`} />
              <div className={`skeleton ${styles.field}`} />
              <div className={`skeleton ${styles.field}`} />
            </div>
          </div>

          {/* Payment */}
          <div className={styles.section}>
            <div className={`skeleton ${styles.sectionTitle}`} />
            <div className={`skeleton ${styles.field}`} />
            <div className={`skeleton ${styles.field}`} />
            <div className={`skeleton ${styles.field}`} />
          </div>

          <div className={`skeleton ${styles.submitBtn}`} />
        </div>

        {/* Right: order summary */}
        <div className={styles.summary}>
          <div className={`skeleton ${styles.summaryTitle}`} />
          <div className={`skeleton ${styles.summaryItem}`} />
          <div className={`skeleton ${styles.summaryRow}`} />
          <div className={`skeleton ${styles.summaryRow}`} />
          <div className={`skeleton ${styles.summaryTotal}`} />
        </div>
      </div>
    </div>
  );
}
