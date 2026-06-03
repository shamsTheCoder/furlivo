'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminLayout.module.css';

import {
  HiOutlineChartBar, HiOutlineCube, HiOutlineShoppingBag,
  HiOutlineUsers, HiOutlinePresentationChartLine, HiOutlineMegaphone,
  HiOutlineDocumentText, HiOutlineCog6Tooth, HiOutlineBuildingStorefront,
  HiOutlineArrowRightOnRectangle, HiOutlineUserGroup,
} from 'react-icons/hi2';
import { PiPawPrintFill } from 'react-icons/pi';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import type { Permission } from '@/lib/rbac';

// ─── Nav Definition ───────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  permission?: Permission;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <HiOutlineChartBar /> },
  { label: 'Orders', href: '/orders', icon: <HiOutlineCube />, permission: 'view:orders' },
  { label: 'Products', href: '/products', icon: <HiOutlineShoppingBag />, permission: 'view:products' },
  { label: 'Customers', href: '/customers', icon: <HiOutlineUsers />, permission: 'view:customers' },
  { label: 'Analytics', href: '/analytics', icon: <HiOutlinePresentationChartLine />, permission: 'view:analytics' },
  { label: 'Marketing', href: '/marketing', icon: <HiOutlineMegaphone />, permission: 'view:marketing' },
  { label: 'Blog', href: '/content', icon: <HiOutlineDocumentText />, permission: 'view:blog' },
  { label: 'Team', href: '/team', icon: <HiOutlineUserGroup />, permission: 'view:team' },
  { label: 'Settings', href: '/settings', icon: <HiOutlineCog6Tooth />, permission: 'view:settings' },
];

// ─── Inner Layout (needs auth context) ───────────────────────────────────────

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, hasPermission, signOut } = useAuth();

  const visibleNav = NAV_ITEMS.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  const activeLabel = visibleNav.find((n) =>
    n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
  )?.label ?? 'Admin';

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar} role="navigation" aria-label="Admin navigation">
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <span className={styles.logoEmoji}>
            <PiPawPrintFill color="var(--orange)" />
          </span>
          <div>
            <div className={styles.logoName}>Furlivo</div>
            <div className={styles.logoSub}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {visibleNav.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
          <Link
            href={process.env.NEXT_PUBLIC_STOREFRONT_URL ?? 'http://localhost:3000'}
            target="_blank"
            className={styles.viewStore}
          >
            <span><HiOutlineBuildingStorefront size={18} /></span>
            <span>View Store</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>{activeLabel}</div>
          <div className={styles.topbarActions}>
            {!loading && user && (
              <>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: user.roleColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {user.roleLabel}
                  </div>
                </div>
                <button
                  onClick={signOut}
                  title="Sign out"
                  aria-label="Sign out"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all var(--t-fast) var(--ease)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--error-pale)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--error)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--error)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <HiOutlineArrowRightOnRectangle size={18} />
                  Sign out
                </button>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

// ─── Exported Layout (wraps with AuthProvider) ────────────────────────────────

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
