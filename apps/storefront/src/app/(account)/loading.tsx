import styles from './AccountSkeleton.module.css';

/**
 * Next.js Suspense boundary for all (account) routes.
 * Mirrors the account dashboard layout with a shimmer skeleton.
 */
export default function AccountLoading() {
  return (
    <main className={styles.main}>
      <div className="container">
        {/* Avatar + name */}
        <div className={styles.header}>
          <div className={`skeleton skeleton-circle ${styles.avatar}`} />
          <div className={styles.nameBlock}>
            <div className={`skeleton ${styles.name}`} />
            <div className={`skeleton skeleton-text ${styles.email}`} />
          </div>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`skeleton ${styles.card}`} />
          ))}
        </div>

        {/* Sign out button */}
        <div className={`skeleton ${styles.signout}`} />
      </div>
    </main>
  );
}
