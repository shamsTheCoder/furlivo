'use client';

import React from 'react';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineArrowPath } from 'react-icons/hi2';
import styles from './BrandValues.module.css';

const values = [
  {
    Icon: HiOutlineTruck,
    title: 'Free Express Shipping',
    desc: 'On all orders above ₹2,999'
  },
  {
    Icon: HiOutlineShieldCheck,
    title: 'Vet Recommended',
    desc: 'Tested and approved by professionals'
  },
  {
    Icon: HiOutlineArrowPath,
    title: '30-Day Returns',
    desc: 'Not happy? Get a full refund'
  }
];

export default function BrandValues() {
  return (
    <section className={styles.section} aria-label="Our Values">
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {values.map((v, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.iconWrap}>
                <v.Icon size={24} />
              </div>
              <h3 className={styles.title}>{v.title}</h3>
              <p className={styles.desc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
