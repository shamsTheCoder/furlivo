'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiChevronDown } from 'react-icons/hi2';
import { MdOutlineVerified } from 'react-icons/md';
import styles from './FAQSection.module.css';

const faqs = [
  {
    q: 'Is the steam hot? Will it hurt my pet?',
    a: 'No — the Furlivo brush uses cool-mist atomization technology, not hot steam. The spray is room temperature and completely safe for all pets, including sensitive-skinned animals.',
  },
  {
    q: 'What can I put in the reservoir?',
    a: 'Plain water works perfectly. You can also add a few drops of pet-safe conditioning serum. Never use hot water, essential oils, or human hair products.',
  },
  {
    q: 'What breeds and animals does it work for?',
    a: 'The Furlivo brush works on all coat types — short, long, curly, or double-coated. Suitable for dogs, cats, rabbits, and guinea pigs.',
  },
  {
    q: 'How do I clean the brush?',
    a: 'The brush cushion detaches with one click for easy rinsing under running water. The body is IPX4 splash-resistant. Do not submerge the main unit.',
  },
  {
    q: 'How long does the battery last?',
    a: 'On a full charge (≈ 90 minutes via USB-C), the brush delivers up to 60 minutes of continuous use with spray active.',
  },
  {
    q: 'Do you offer COD and UPI in India?',
    a: 'Yes! We offer Cash on Delivery (COD) across all major Indian cities and pincodes. We also accept UPI, Debit/Credit Cards, and net banking via Razorpay.',
  },
];

const trust = [
  '4.9 / 5 from 2,847 verified reviews',
  '30-day no-questions-asked returns',
  'Vet-recommended by 500+ clinics',
  'Secure checkout — UPI, Cards, COD',
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>

          {/* ── Left: sticky sidebar ──────────────────────── */}
          <div className={styles.sidebar}>
            <p className="eyebrow">FAQ</p>
            <h2 className={styles.title}>Common questions, answered</h2>
            <p className={styles.sub}>
              Can't find what you're looking for? Email us at{' '}
              <a href="mailto:hello@furlivo.shop" className={styles.emailLink}>
                hello@furlivo.shop
              </a>{' '}
              — we reply within 2 hours.
            </p>

            {/* Trust signals */}
            <ul className={styles.trustList}>
              {trust.map((t) => (
                <li key={t} className={styles.trustItem}>
                  <MdOutlineVerified size={16} className={styles.trustIcon} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <Link href="/products/steam-grooming-brush" className="btn btn-primary btn-lg">
              Shop Now — ₹2,399
            </Link>
          </div>

          {/* ── Right: accordion ──────────────────────────── */}
          <div className={styles.accordion}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  id={`faq-btn-${i}`}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className={styles.qNum}>0{i + 1}</span>
                  <span className={styles.qText}>{faq.q}</span>
                  <HiChevronDown
                    size={18}
                    className={`${styles.chevron} ${open === i ? styles.chevronOpen : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={styles.answerWrap}
                >
                  <div className={styles.answerInner}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
