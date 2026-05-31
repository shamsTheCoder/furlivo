'use client';

import { useState } from 'react';
import { HiMagnifyingGlass, HiCheckCircle, HiTruck, HiArchiveBox, HiHome } from 'react-icons/hi2';
import Spinner from '@/components/shared/Spinner';
import styles from './order-tracking.module.css';

interface TrackingStep {
  label: string;
  desc: string;
  done: boolean;
  active: boolean;
}

const DEMO_STEPS: TrackingStep[] = [
  { label: 'Order Placed', desc: 'We received your order and started processing it.', done: true, active: false },
  { label: 'Packed & Dispatched', desc: 'Your Furlivo brush has been packed and handed to our courier partner.', done: true, active: false },
  { label: 'In Transit', desc: 'Your package is on its way. Expected delivery in 1–2 business days.', done: false, active: true },
  { label: 'Out for Delivery', desc: 'Your order is out for delivery today.', done: false, active: false },
  { label: 'Delivered', desc: 'Package delivered successfully.', done: false, active: false },
];

const stepIcons = [HiArchiveBox, HiCheckCircle, HiTruck, HiTruck, HiHome];

export default function OrderTrackingClient() {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    await new Promise(r => setTimeout(r, 1400));
    // Demo: any input shows tracking
    setStatus(orderNum.length > 0 ? 'found' : 'notfound');
  };

  return (
    <div className={styles.trackingWrap}>
      {/* Form */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Track your shipment</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="field">
            <label className="label" htmlFor="order-num">Order Number</label>
            <input
              id="order-num"
              type="text"
              className="input"
              placeholder="e.g. FRL-20261234"
              value={orderNum}
              onChange={e => setOrderNum(e.target.value)}
              required
              disabled={status === 'loading'}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="track-email">Email Address</label>
            <input
              id="track-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={status === 'loading'}>
            {status === 'loading'
              ? <><Spinner size="sm" color="white" /> Tracking…</>
              : <><HiMagnifyingGlass size={18} /> Track Order</>
            }
          </button>
        </form>
      </div>

      {/* Result */}
      {status === 'found' && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div>
              <div className={styles.resultOrderNum}>Order #{orderNum || 'FRL-20261234'}</div>
              <div className={styles.resultStatus}><HiTruck size={16} /> In Transit — Arriving tomorrow</div>
            </div>
            <div className={styles.resultBadge}>
              <span className="badge badge-green">On Track</span>
            </div>
          </div>

          <div className={styles.courierInfo}>
            <span className={styles.courierLabel}>Courier</span>
            <span>Delhivery · Tracking ID: <strong>DEL987654321</strong></span>
          </div>

          <div className={styles.timeline}>
            {DEMO_STEPS.map(({ label, desc, done, active }, i) => {
              const Icon = stepIcons[i]!;
              return (
                <div
                  key={label}
                  className={`${styles.step} ${done ? styles.stepDone : ''} ${active ? styles.stepActive : ''}`}
                >
                  <div className={styles.stepIconWrap}>
                    <Icon size={18} className={styles.stepIcon} />
                    {i < DEMO_STEPS.length - 1 && <div className={styles.stepLine} />}
                  </div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepLabel}>{label}</div>
                    <div className={styles.stepDesc}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {status === 'notfound' && (
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}><HiMagnifyingGlass size={48} /></div>
          <h3>Order not found</h3>
          <p>Please double-check your order number and email address. If you still can&apos;t find it, <a href="mailto:hello@furlivo.shop" className={styles.helpLink}>contact our support team</a>.</p>
        </div>
      )}
    </div>
  );
}
