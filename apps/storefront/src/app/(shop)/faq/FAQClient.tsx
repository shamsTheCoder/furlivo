'use client';

import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import styles from './faq.module.css';

interface FAQ {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  questions: FAQ[];
}

export default function FAQClient({ faqs }: { faqs: FAQCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <div className={styles.faqList}>
      {faqs.map((section, si) => (
        <div key={section.category} className={styles.faqCategory}>
          <h2 className={styles.categoryTitle}>{section.category}</h2>
          <div className={styles.accordion}>
            {section.questions.map((item, qi) => {
              const key = `${si}-${qi}`;
              const isOpen = openKey === key;
              return (
                <div key={qi} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                  <button
                    className={styles.question}
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    id={`faq-btn-${key}`}
                    aria-controls={`faq-answer-${key}`}
                  >
                    <span>{item.q}</span>
                    <HiChevronDown
                      size={20}
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${key}`}
                    role="region"
                    aria-labelledby={`faq-btn-${key}`}
                    className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                  >
                    <p className={styles.answerText}>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
