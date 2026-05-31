import styles from './ProductPage.module.css';

/**
 * Next.js Suspense boundary for /products/[slug].
 * Shown instantly while the server renders the product page, preventing
 * a blank-screen flash that previously occurred with no loading fallback.
 */
export default function ProductLoading() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.breadcrumb}`}>
        <div className="skeleton" style={{ width: 180, height: 14, borderRadius: 6 }} />
      </div>

      <div className={`container ${styles.layout}`}>
        {/* Gallery skeleton */}
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`skeleton ${styles.thumb}`} style={{ border: 'none' }} />
            ))}
          </div>
          <div className={`skeleton ${styles.mainImg}`} style={{ border: 'none', borderRadius: 24 }} />
        </div>

        {/* Info skeleton */}
        <div className={styles.info}>
          <div className="skeleton" style={{ width: 160, height: 14, borderRadius: 6 }} />
          <div className="skeleton skeleton-title" style={{ width: '80%', borderRadius: 8 }} />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
          <div className="skeleton" style={{ height: 52, borderRadius: 40, width: '60%' }} />
          <div className="skeleton skeleton-btn" style={{ width: '100%' }} />
          <div className="skeleton skeleton-btn" style={{ width: '100%' }} />
          <div className="skeleton" style={{ height: 80, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}
