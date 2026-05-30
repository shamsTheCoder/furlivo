'use client';

import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import styles from './FAQSection.module.css';

const faqs = [
  {
    q: 'Is the steam hot? Will it hurt my pet?',
    a: 'No — the Furlivo brush uses cool-mist atomization technology, not hot steam. The spray is room temperature and completely safe for all pets, including sensitive-skinned animals.',
  },
  {
    q: 'What can I put in the reservoir?',
    a: 'Plain water works perfectly. You can also add a few drops of pet-safe conditioning serum or leave-in detangler. Never use hot water, essential oils, or human hair products.',
  },
  {
    q: 'What breeds and animals does it work for?',
    a: 'The Furlivo brush works on all coat types — short, long, curly, or double-coated. It is suitable for dogs, cats, rabbits, and guinea pigs.',
  },
  {
    q: 'How do I clean the brush?',
    a: 'The brush cushion detaches with one click for easy cleaning under running water. The body is splash-resistant (IPX4). Do not submerge the main unit.',
  },
  {
    q: 'How long does the battery last?',
    a: 'On a full charge (approx. 90 minutes via USB-C), the brush delivers up to 60 minutes of continuous use with the spray active.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD) in India?',
    a: 'Yes! We offer COD across all major cities and pincodes in India. We also accept UPI, Debit/Credit Cards, and net banking via Razorpay.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <p className="eyebrow">FAQ</p>
            <h2 className={styles.title}>Questions? We have answers.</h2>
            <p className={styles.sub}>
              Still not sure? Email us at{' '}
              <a href="mailto:hello@furlivo.shop" className={styles.link}>hello@furlivo.shop</a>{' '}
              and we'll reply within a few hours.
            </p>
            <a href="/products/steam-grooming-brush" className={`btn btn-primary btn-lg ${styles.cta}`}>
              Shop Now — ₹2,399
            </a>
          </div>

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
                  <span>{faq.q}</span>
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
                  className={styles.answer}
                  style={{ display: open === i ? 'block' : 'none' }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
