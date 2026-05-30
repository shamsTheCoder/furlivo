'use client';

import { useState } from 'react';
import { MdArrowForward, MdEmail } from 'react-icons/md';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.iconWrap}><MdEmail size={28} /></div>
          <div>
            <h2 className={styles.title}>Get 15% off your first order</h2>
            <p className={styles.sub}>
              Join 12,000+ pet parents. Grooming tips, exclusive deals, early access to new products.
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <div>
              <div className={styles.successTitle}>You're in! Check your inbox.</div>
              <div className={styles.successSub}>Your 15% discount code is on its way.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrap}>
              <input
                id="newsletter-email"
                type="email"
                className={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit" className={styles.submitBtn}>
                <span className="hide-mobile">Get 15% Off</span>
                <MdArrowForward size={18} />
              </button>
            </div>
            <p className={styles.disclaimer}>No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
