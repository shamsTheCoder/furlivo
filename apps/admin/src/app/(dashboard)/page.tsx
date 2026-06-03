import type { Metadata } from 'next';
import styles from './dashboard.module.css';

import { 
  HiOutlineCurrencyRupee, HiOutlineCube, 
  HiOutlineUsers, HiOutlineChartBar, HiOutlineArrowTrendingUp
} from 'react-icons/hi2';

export const metadata: Metadata = { title: 'Dashboard' };

const stats = [
  { label: 'Revenue Today', value: '₹0', change: '+0%', icon: <HiOutlineCurrencyRupee size={24} />, color: '#E8935A' },
  { label: 'Orders Today', value: '0', change: '+0%', icon: <HiOutlineCube size={24} />, color: '#5B9EA0' },
  { label: 'Active Customers', value: '0', change: '+0%', icon: <HiOutlineUsers size={24} />, color: '#7A9E7E' },
  { label: 'Avg Order Value', value: '₹0', change: '+0%', icon: <HiOutlineChartBar size={24} />, color: '#C9A84C' },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back to Furlivo Admin</p>
        </div>
        <div className={styles.date}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${s.color}20`, color: s.color }}>
              {s.icon}
            </div>
            <div className={styles.statBody}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statChange}>{s.change} vs yesterday</div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Revenue (Last 30 Days)</h2>
          <div className={styles.chartPlaceholder}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineArrowTrendingUp size={20} /> Connect Supabase to see live data</span>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Recent Orders</h2>
          <div className={styles.chartPlaceholder}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineCube size={20} /> No orders yet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
