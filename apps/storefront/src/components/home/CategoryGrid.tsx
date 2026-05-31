'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryGrid.module.css';

const categories = [
  { name: 'Grooming Tools', img: '/images/product-hero.png', href: '/products', color: 'var(--orange-pale)' },
  { name: 'Accessories', img: '/images/flatlay.png', href: '/products', color: 'var(--cream-2)' },
  { name: 'Bundles', img: '/images/lifestyle.png', href: '/products', color: 'var(--success-pale)' },
];

export default function CategoryGrid() {
  return (
    <section className={styles.section} aria-label="Shop by Category">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
        </div>
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href} className={styles.card}>
              <div className={styles.imgWrap} style={{ backgroundColor: cat.color }}>
                <Image src={cat.img} alt={cat.name} fill className={styles.img} sizes="(max-width: 768px) 33vw, 20vw" />
              </div>
              <span className={styles.name}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
