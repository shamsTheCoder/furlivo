'use client';

import { useState } from 'react';
import { MdOutlineMailOutline, MdArrowForward } from 'react-icons/md';
import Spinner from '@/components/shared/Spinner';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          
          {/* Background decorative elements */}
          <div className={styles.glow1} aria-hidden="true" />
          <div className={styles.glow2} aria-hidden="true" />

          <div className={styles.content}>
            
            {/* Left: Copy */}
            <div className={styles.copy}>
              <div className={styles.iconWrap}>
                <MdOutlineMailOutline size={28} />
              </div>
              <h2 id="newsletter-heading" className={styles.title}>
                Unlock 15% off your first order
              </h2>
              <p className={styles.sub}>
                Join 12,000+ pet parents receiving grooming tips, exclusive deals, and early access to new product drops.
              </p>
            </div>

            {/* Right: Form / Success state */}
            <div className={styles.formContainer}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <div>
                    <h3 className={styles.successTitle}>You're on the list!</h3>
                    <p className={styles.successSub}>Check your inbox for your 15% off code.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      className={styles.input}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === 'loading'}
                    />
                    <button 
                      type="submit" 
                      className={`btn btn-dark ${styles.submitBtn}`}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <Spinner size="sm" color="white" />
                      ) : (
                        <>
                          <span className="hide-mobile">Get 15% Off</span>
                          <MdArrowForward size={20} className={styles.btnIcon} />
                        </>
                      )}
                    </button>
                  </div>
                  <p className={styles.disclaimer}>
                    By subscribing, you agree to our <a href="/privacy-policy">Privacy Policy</a>. No spam, ever.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
