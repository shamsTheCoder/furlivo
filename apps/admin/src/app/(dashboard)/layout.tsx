'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminLayout.module.css';

const nav = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Orders', href: '/orders', icon: '📦' },
  { label: 'Products', href: '/products', icon: '🛍️' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Analytics', href: '/analytics', icon: '📈' },
  { label: 'Marketing', href: '/marketing', icon: '📣' },
  { label: 'Blog', href: '/content', icon: '✍️' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar} role="navigation" aria-label="Admin navigation">
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <span className={styles.logoEmoji}>🐾</span>
          <div>
            <div className={styles.logoName}>Furlivo</div>
            <div className={styles.logoSub}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {nav.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className={styles.activePill} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <Link href={process.env.NEXT_PUBLIC_STOREFRONT_URL ?? 'http://localhost:3000'} target="_blank" className={styles.viewStore}>
            <span>🏪</span>
            <span>View Store</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>
            {nav.find((n) => (n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)))?.label ?? 'Admin'}
          </div>
          <div className={styles.topbarActions}>
            <div className={styles.adminAvatar} title="Admin">👤</div>
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
