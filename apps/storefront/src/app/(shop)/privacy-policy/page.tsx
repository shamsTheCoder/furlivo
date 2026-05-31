import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — Furlivo',
  description: 'How Furlivo collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Legal</p>
              <h1 className={styles.heroTitle}>Privacy Policy</h1>
              <p className={styles.heroCopy}>Last updated: 1 May 2026</p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.contentSection}`}>
          <div className="container">
            <div className={styles.contentWrap}>
              <div className={styles.prose}>
                <p>
                  Furlivo (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information 
                  and your right to privacy. This Privacy Policy explains what information we collect, how we 
                  use it, and what rights you have in relation to it.
                </p>

                <h2>1. Information We Collect</h2>
                <p>We collect information you provide directly to us, including:</p>
                <ul>
                  <li><strong>Account information:</strong> Name, email address, and password when you register.</li>
                  <li><strong>Order information:</strong> Shipping address, phone number, and payment details (processed securely via Razorpay — we do not store card numbers).</li>
                  <li><strong>Communications:</strong> Messages you send us via email or our contact form.</li>
                </ul>
                <p>We also automatically collect:</p>
                <ul>
                  <li><strong>Usage data:</strong> Pages viewed, links clicked, referring URLs, and device type.</li>
                  <li><strong>Cookies:</strong> Session cookies for authentication, and analytics cookies (see Section 5).</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <ul>
                  <li>To process and fulfil your orders.</li>
                  <li>To send order confirmations, shipping updates, and delivery notifications.</li>
                  <li>To respond to your questions and support requests.</li>
                  <li>To send marketing communications (only with your consent; you can opt out at any time).</li>
                  <li>To improve our website, products, and services.</li>
                  <li>To comply with legal obligations.</li>
                </ul>

                <h2>3. How We Share Your Information</h2>
                <p>We do not sell your personal information. We share it only with:</p>
                <ul>
                  <li><strong>Logistics partners</strong> (e.g., Delhivery, Blue Dart) to fulfil and deliver orders.</li>
                  <li><strong>Payment processors</strong> (Razorpay) to process transactions securely.</li>
                  <li><strong>Analytics providers</strong> (Vercel Analytics) to understand website usage in an aggregated, anonymised form.</li>
                  <li><strong>Legal authorities</strong> when required by law.</li>
                </ul>

                <h2>4. Data Retention</h2>
                <p>
                  We retain your personal information for as long as your account is active or as needed to 
                  provide services and comply with legal obligations. You may request deletion of your account 
                  at any time by emailing us.
                </p>

                <h2>5. Cookies</h2>
                <p>
                  We use essential cookies for authentication and cart persistence. We use analytics cookies 
                  (anonymised) to understand how users interact with our site. You can disable cookies in 
                  your browser settings, though some features may not work correctly.
                </p>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you.</li>
                  <li>Correct inaccurate information.</li>
                  <li>Request deletion of your data.</li>
                  <li>Object to or restrict processing of your data.</li>
                  <li>Withdraw consent for marketing communications at any time.</li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{' '}
                  <a href="mailto:privacy@furlivo.shop">privacy@furlivo.shop</a>.
                </p>

                <h2>7. Security</h2>
                <p>
                  We use industry-standard security measures to protect your data, including SSL/TLS encryption 
                  for all data in transit, and secure infrastructure provided by Supabase and Vercel. However, 
                  no method of transmission over the internet is 100% secure.
                </p>

                <h2>8. Children&apos;s Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18. We do not knowingly collect personal 
                  information from children.
                </p>

                <h2>9. Changes to This Policy</h2>
                <p>
                  We may update this policy from time to time. We will notify you of significant changes via 
                  email or a prominent notice on our website.
                </p>

                <h2>10. Contact</h2>
                <p>
                  Questions about this policy? Contact us at{' '}
                  <a href="mailto:privacy@furlivo.shop">privacy@furlivo.shop</a>
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
