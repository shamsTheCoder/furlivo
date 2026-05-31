import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiArchiveBox, HiEnvelope, HiArrowPath } from 'react-icons/hi2';
import OrderTrackingClient from './OrderTrackingClient';
import styles from './order-tracking.module.css';

export const metadata: Metadata = {
  title: 'Track Your Order — Furlivo',
  description: 'Enter your order number and email to get real-time shipping updates on your Furlivo order.',
};

export default function OrderTrackingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Order Tracking</p>
              <h1 className={styles.heroTitle}>Where&apos;s my order?</h1>
              <p className={styles.heroCopy}>
                Enter your order number and email address to get live shipping updates.
              </p>
            </div>
          </div>
        </section>

        {/* Tracking form */}
        <section className={`section ${styles.trackingSection}`}>
          <div className="container">
            <OrderTrackingClient />
          </div>
        </section>

        {/* Help */}
        <section className={`section-sm ${styles.helpSection}`}>
          <div className="container">
            <div className={styles.helpGrid}>
              <div className={styles.helpCard}>
                <div className={styles.helpIcon}><HiArchiveBox /></div>
                <h3 className={styles.helpTitle}>When will I receive my order?</h3>
                <p className={styles.helpCopy}>
                  Metro cities: 3–4 business days. Tier 2/3 cities: 5–7 business days. 
                  You&apos;ll receive a tracking link via SMS and email once dispatched.
                </p>
              </div>
              <div className={styles.helpCard}>
                <div className={styles.helpIcon}><HiEnvelope /></div>
                <h3 className={styles.helpTitle}>Didn&apos;t get a confirmation email?</h3>
                <p className={styles.helpCopy}>
                  Check your spam folder first. If it&apos;s not there, contact us at{' '}
                  <a href="mailto:hello@furlivo.shop" className={styles.helpLink}>
                    hello@furlivo.shop
                  </a>{' '}
                  with your name and phone number.
                </p>
              </div>
              <div className={styles.helpCard}>
                <div className={styles.helpIcon}><HiArrowPath /></div>
                <h3 className={styles.helpTitle}>Need to return or exchange?</h3>
                <p className={styles.helpCopy}>
                  We offer free 30-day returns. Visit our{' '}
                  <a href="/returns" className={styles.helpLink}>Returns page</a>{' '}
                  or email us directly and we&apos;ll arrange a free pickup.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
