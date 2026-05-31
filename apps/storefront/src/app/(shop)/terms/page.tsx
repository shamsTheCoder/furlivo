import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service — Furlivo',
  description: 'Furlivo\'s terms of service governing the use of our website and purchase of our products.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Legal</p>
              <h1 className={styles.heroTitle}>Terms of Service</h1>
              <p className={styles.heroCopy}>Last updated: 1 May 2026</p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.contentSection}`}>
          <div className="container">
            <div className={styles.contentWrap}>
              <div className={styles.prose}>
                <p>
                  By accessing or using the Furlivo website (furlivo.shop) or purchasing our products, you 
                  agree to be bound by these Terms of Service. Please read them carefully.
                </p>

                <h2>1. About Furlivo</h2>
                <p>
                  Furlivo is a direct-to-consumer pet grooming brand based in India. We operate this website 
                  to sell our products directly to consumers across India.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                  You must be at least 18 years old and have the legal capacity to enter into a binding contract 
                  to use our services. By using this website, you represent that you meet these requirements.
                </p>

                <h2>3. Products & Pricing</h2>
                <ul>
                  <li>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes.</li>
                  <li>We reserve the right to change prices at any time without prior notice. The price at the time of order confirmation is the price you pay.</li>
                  <li>Product images are for illustrative purposes. Actual product colours may vary slightly due to photography and screen settings.</li>
                </ul>

                <h2>4. Orders & Payment</h2>
                <ul>
                  <li>An order is confirmed only after we send you an order confirmation email.</li>
                  <li>We reserve the right to cancel orders in cases of pricing errors, stock unavailability, or suspected fraud.</li>
                  <li>Payment is processed securely via Razorpay. We do not store your card details.</li>
                </ul>

                <h2>5. Shipping</h2>
                <p>
                  We ship across India. Estimated delivery times are provided in good faith but are not guaranteed. 
                  We are not liable for delays caused by courier partners, weather, or other circumstances beyond our control.
                </p>

                <h2>6. Returns & Refunds</h2>
                <p>
                  Our returns and refunds policy is governed by our separate{' '}
                  <a href="/returns">Returns & Refunds Policy</a>, which forms part of these Terms.
                </p>

                <h2>7. Intellectual Property</h2>
                <p>
                  All content on this website — including text, images, logos, and product descriptions — is the 
                  intellectual property of Furlivo and may not be reproduced without our written consent.
                </p>

                <h2>8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Furlivo is not liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of our products or website. Our total 
                  liability shall not exceed the amount paid for the product in question.
                </p>

                <h2>9. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive 
                  jurisdiction of the courts in Mumbai, Maharashtra.
                </p>

                <h2>10. Changes to Terms</h2>
                <p>
                  We may update these Terms at any time. Continued use of our website after changes constitutes 
                  acceptance of the revised Terms.
                </p>

                <h2>11. Contact</h2>
                <p>
                  Questions? Email us at{' '}
                  <a href="mailto:legal@furlivo.shop">legal@furlivo.shop</a>
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
