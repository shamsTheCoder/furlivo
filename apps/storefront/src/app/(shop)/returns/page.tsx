import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiGift } from 'react-icons/hi2';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Returns & Refunds — Furlivo',
  description: 'Furlivo\'s hassle-free 30-day return and refund policy. We want you and your pet to be 100% happy.',
};

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Customer First</p>
              <h1 className={styles.heroTitle}>Returns & Refunds</h1>
              <p className={styles.heroCopy}>
                We want every Furlivo experience to be a great one. If it&apos;s not — we&apos;ll make it right.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.contentSection}`}>
          <div className="container">
            <div className={styles.contentWrap}>
              <div className={styles.highlightBox}>
                <div className={styles.highlightIcon}><HiGift /></div>
                <div>
                  <div className={styles.highlightTitle}>30-Day No-Questions-Asked Returns</div>
                  <div className={styles.highlightCopy}>
                    Received your Furlivo brush and it&apos;s not for you? No worries. Contact us within 
                    30 days of delivery and we&apos;ll arrange a free return pickup.
                  </div>
                </div>
              </div>

              <div className={styles.prose}>
                <h2>How to Return</h2>
                <ol>
                  <li>Email us at <a href="mailto:hello@furlivo.shop">hello@furlivo.shop</a> with your order number and reason for return.</li>
                  <li>We&apos;ll confirm and send a prepaid return shipping label within 24 hours.</li>
                  <li>Pack the item securely in its original packaging (if possible).</li>
                  <li>Hand it off to our courier — they&apos;ll come to your address.</li>
                  <li>Once received and inspected, your refund will be processed within 5–7 business days.</li>
                </ol>

                <h2>Eligibility</h2>
                <ul>
                  <li>Items must be returned within <strong>30 days</strong> of the delivery date.</li>
                  <li>Products should be in original condition — not heavily used or damaged.</li>
                  <li>Include all original accessories (USB-C cable, manual, box).</li>
                  <li>Hygiene products that have been opened may not be eligible for return. Contact us first.</li>
                </ul>

                <h2>Refund Methods</h2>
                <p>Refunds are issued to your original payment method:</p>
                <ul>
                  <li><strong>UPI / Net Banking / Wallets:</strong> 2–5 business days</li>
                  <li><strong>Credit / Debit Cards:</strong> 5–7 business days</li>
                  <li><strong>Cash on Delivery orders:</strong> Refunded via bank transfer (NEFT). Please share your bank details via email.</li>
                </ul>

                <h2>Exchanges</h2>
                <p>
                  Want a different colour? Exchanges are free within 30 days. Just mention it when you email us 
                  and we&apos;ll send the replacement once we receive the original.
                </p>

                <h2>Damaged or Defective Items</h2>
                <p>
                  If your item arrived damaged or is defective, please email us with photos within 48 hours of 
                  delivery. We&apos;ll send a replacement at no cost — no return required.
                </p>

                <h2>Contact Us</h2>
                <p>
                  Questions? Our team is here to help:{' '}
                  <a href="mailto:hello@furlivo.shop">hello@furlivo.shop</a>
                  <br />
                  We respond within 24 hours on business days (Monday–Saturday).
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
