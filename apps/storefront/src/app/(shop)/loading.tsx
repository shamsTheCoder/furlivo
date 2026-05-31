import styles from './ShopSkeleton.module.css';

/**
 * Next.js Suspense boundary for all (shop) routes.
 * Shows a product-grid skeleton while any shop page renders server-side.
 */
export default function ShopLoading() {
  return (
    <div className={styles.page}>
      {/* Page hero */}
      <div className={styles.hero}>
        <div className="container">
          <div className={`skeleton ${styles.heroEyebrow}`} />
          <div className={`skeleton skeleton-title ${styles.heroTitle}`} />
          <div className={`skeleton skeleton-text ${styles.heroSub}`} />
        </div>
      </div>

      {/* Product cards grid */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.card}>
                <div className={`skeleton skeleton-img ${styles.cardImg}`} />
                <div className={styles.cardBody}>
                  <div className={`skeleton ${styles.cardTitle}`} />
                  <div className={`skeleton skeleton-text ${styles.cardDesc}`} />
                  <div className={`skeleton ${styles.cardPrice}`} />
                  <div className={`skeleton ${styles.cardBtn}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
