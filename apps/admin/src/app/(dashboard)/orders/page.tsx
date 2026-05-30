import type { Metadata } from 'next';
import styles from './orders.module.css';

export const metadata: Metadata = { title: 'Orders' };

const mockOrders = [
  { number: 'FRL-001000', customer: 'Sarah Mitchell', email: 'sarah@example.com', status: 'delivered', total: 2799, date: '2026-05-28', items: 1 },
  { number: 'FRL-001001', customer: 'James Torres', email: 'james@example.com', status: 'shipped', total: 5598, date: '2026-05-29', items: 2 },
  { number: 'FRL-001002', customer: 'Lisa Kim', email: 'lisa@example.com', status: 'processing', total: 2799, date: '2026-05-30', items: 1 },
  { number: 'FRL-001003', customer: 'Marco Rossi', email: 'marco@example.com', status: 'paid', total: 4299, date: '2026-05-30', items: 1 },
  { number: 'FRL-001004', customer: 'Emily Wong', email: 'emily@example.com', status: 'pending', total: 2799, date: '2026-05-31', items: 1 },
];

const statusColors: Record<string, string> = {
  pending: '#F5A623',
  paid: '#5B9EA0',
  processing: '#7A9E7E',
  shipped: '#C9A84C',
  delivered: '#4CAF82',
  cancelled: '#E05252',
  refunded: '#8a8a9a',
};

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>{mockOrders.length} total orders</p>
        </div>
        <button className={styles.exportBtn}>⬇ Export CSV</button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
          <button key={f} className={`${styles.filterBtn} ${f === 'All' ? styles.filterActive : ''}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((o) => (
              <tr key={o.number} className={styles.row}>
                <td className={styles.orderNum}>{o.number}</td>
                <td>
                  <div className={styles.customer}>{o.customer}</div>
                  <div className={styles.email}>{o.email}</div>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: `${statusColors[o.status]}20`,
                      color: statusColors[o.status],
                      borderColor: `${statusColors[o.status]}40`,
                    }}
                  >
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </span>
                </td>
                <td className={styles.items}>{o.items}</td>
                <td className={styles.total}>${(o.total / 100).toFixed(2)}</td>
                <td className={styles.date}>{o.date}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="View order">👁️</button>
                    <button className={styles.actionBtn} title="Edit order">✏️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
