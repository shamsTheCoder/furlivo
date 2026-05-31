import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HiArrowLeft, HiChevronRight, HiArchiveBox } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './orders.module.css';

export const metadata: Metadata = { title: 'My Orders — Furlivo' };

const DEMO_ORDERS = [
  {
    id: 'FRL-20261234',
    date: 'May 28, 2026',
    status: 'Delivered',
    statusType: 'success',
    items: [{ name: 'Steam Pet Grooming Brush', variant: 'Sage Green', qty: 1, price: 2399 }],
    total: 2399,
  },
  {
    id: 'FRL-20260987',
    date: 'April 14, 2026',
    status: 'Delivered',
    statusType: 'success',
    items: [
      { name: 'Steam Pet Grooming Brush', variant: 'Cream White', qty: 1, price: 2399 },
      { name: 'Pet Hair Remover Roller', variant: null, qty: 1, price: 1499 },
    ],
    total: 3898,
  },
];

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirectTo=/account/orders');

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.backRow}>
            <Link href="/account" className={styles.backLink}>
              <HiArrowLeft size={16} /> Back to Account
            </Link>
          </div>

          <h1 className={styles.title}>My Orders</h1>

          {DEMO_ORDERS.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}><HiArchiveBox /></div>
              <h2>No orders yet</h2>
              <p>Your order history will appear here once you make a purchase.</p>
              <Link href="/products" className="btn btn-primary btn-lg">Start Shopping</Link>
            </div>
          ) : (
            <div className={styles.orderList}>
              {DEMO_ORDERS.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <div className={styles.orderId}>{order.id}</div>
                      <div className={styles.orderDate}>{order.date}</div>
                    </div>
                    <div className={styles.orderHeaderRight}>
                      <span className={`badge badge-${order.statusType === 'success' ? 'green' : 'muted'}`}>
                        {order.status}
                      </span>
                      <div className={styles.orderTotal}>{fmt(order.total)}</div>
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item, i) => (
                      <div key={i} className={styles.orderItem}>
                        <div className={styles.orderItemInfo}>
                          <div className={styles.orderItemName}>{item.name}</div>
                          {item.variant && (
                            <div className={styles.orderItemVariant}>Colour: {item.variant}</div>
                          )}
                        </div>
                        <div className={styles.orderItemRight}>
                          <div className={styles.orderItemQty}>× {item.qty}</div>
                          <div className={styles.orderItemPrice}>{fmt(item.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <Link href={`/order-tracking?order=${order.id}`} className={styles.trackBtn}>
                      Track Order <HiChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
