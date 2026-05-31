import styles from './CartSkeleton.module.css';

/** Skeleton UI that mirrors the CartPageClient layout during hydration. */
export default function CartSkeleton() {
  return (
    <div className={`container ${styles.page}`}>
      {/* Title */}
      <div className={`skeleton skeleton-title ${styles.title}`} />

      <div className={styles.layout}>
        {/* Items */}
        <div className={styles.items}>
          {[0, 1].map((i) => (
            <div key={i} className={styles.item}>
              <div className={`skeleton skeleton-img ${styles.img}`} />
              <div className={styles.info}>
                <div className={`skeleton skeleton-text ${styles.name}`} />
                <div className={`skeleton skeleton-text ${styles.desc}`} />
                <div className={`skeleton skeleton-text ${styles.price}`} />
                <div className={styles.actions}>
                  <div className={`skeleton ${styles.qty}`} />
                  <div className={`skeleton ${styles.remove}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className={styles.summary}>
          <div className={`skeleton skeleton-title ${styles.summaryTitle}`} />
          <div className={`skeleton skeleton-text ${styles.summaryRow}`} />
          <div className={`skeleton skeleton-text ${styles.summaryRow}`} />
          <div className={`skeleton ${styles.summaryTotal}`} />
          <div className={`skeleton ${styles.btn}`} />
        </div>
      </div>
    </div>
  );
}
