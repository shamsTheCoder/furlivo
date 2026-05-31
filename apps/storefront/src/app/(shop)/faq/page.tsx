import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiChevronDown } from 'react-icons/hi2';
import FAQClient from './FAQClient';
import styles from './faq.module.css';

export const metadata: Metadata = {
  title: 'FAQ — Furlivo',
  description: 'Everything you need to know about the Furlivo Steam Grooming Brush — shipping, returns, how it works, and more.',
};

const faqs = [
  {
    category: 'The Product',
    questions: [
      {
        q: 'How does the steam grooming brush work?',
        a: 'The Furlivo brush has an 80ml water reservoir. Press the power button and within 20 seconds a fine, cool mist starts flowing through the silicone bristles. The mist softens the coat, reduces static, and allows the bristles to glide through — reducing loose fur by up to 90% in a single 5-minute session.',
      },
      {
        q: 'Is the steam safe for my pet?',
        a: 'Absolutely. It\'s actually cool mist — not hot steam. The nozzle disperses water at room temperature into a fine vapour. Vet-tested, vet-approved. Completely safe for dogs and cats of all coat types.',
      },
      {
        q: 'What coat types does it work for?',
        a: 'Short, medium, and long coats — both dogs and cats. The food-grade silicone bristles are gentle enough for fine coats and effective on thick double coats like those of Huskies, German Shepherds, and Maine Coons.',
      },
      {
        q: 'Can I use it on a cat?',
        a: 'Yes! Many of our best reviews come from cat parents. Cats are generally more tolerant of the Furlivo brush because the massaging bristle action mimics the feel of another cat\'s tongue grooming them.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Up to 60 minutes of continuous use on a full charge. Charging via USB-C takes approximately 90 minutes. A single charge is enough for 8–10 grooming sessions for most pets.',
      },
      {
        q: 'Is it waterproof?',
        a: 'The brush is IPX4 splash-proof, meaning it can handle water splashing from any direction. You can rinse the bristle head under running water to clean it. Do not fully submerge the device.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'We ship pan-India via tracked couriers. Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune) typically receive orders within 3–4 business days. Tier 2/3 cities and rural areas take 5–7 business days.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! All orders above ₹2,999 ship for free. Orders below this threshold incur a flat ₹99 shipping fee.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Not yet. We currently ship within India only. International shipping is on our roadmap — sign up for our newsletter to be the first to know when we expand.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day no-questions-asked return policy. If you or your pet are not satisfied, contact us at hello@furlivo.shop within 30 days of delivery and we\'ll arrange a free pick-up and full refund.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect the return, refunds are processed within 5–7 business days back to your original payment method. UPI refunds are usually instant once initiated.',
      },
      {
        q: 'Can I exchange for a different colour?',
        a: 'Yes! Exchanges within 30 days of purchase are free and easy. Just contact our support team and we\'ll sort it out.',
      },
    ],
  },
  {
    category: 'Orders & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Credit/Debit Cards (Visa, Mastercard, Amex), UPI (all apps), Net Banking, Wallets, and Cash on Delivery (COD). Payments are processed securely via Razorpay.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'Orders can be cancelled within 2 hours of placing them. After that, if the order has been dispatched, you\'ll need to use our return process. Contact hello@furlivo.shop immediately for cancellations.',
      },
      {
        q: 'I placed an order but haven\'t received a confirmation email.',
        a: 'Check your spam/junk folder first. If it\'s not there, it\'s possible there was a typo in your email. Contact us at hello@furlivo.shop with your name and phone number and we\'ll look it up.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Support</p>
              <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
              <p className={styles.heroCopy}>
                Everything you need to know. Can&apos;t find your answer?{' '}
                <a href="mailto:hello@furlivo.shop" className={styles.contactLink}>
                  Contact us
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className={`section ${styles.faqSection}`}>
          <div className="container">
            <div className={styles.faqLayout}>
              <FAQClient faqs={faqs} />
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className={`section-sm ${styles.contactSection}`}>
          <div className="container">
            <div className={styles.contactBox}>
              <h2 className={styles.contactTitle}>Still have questions?</h2>
              <p className={styles.contactCopy}>Our team responds within 24 hours on business days.</p>
              <a href="mailto:hello@furlivo.shop" className="btn btn-primary btn-lg">
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
