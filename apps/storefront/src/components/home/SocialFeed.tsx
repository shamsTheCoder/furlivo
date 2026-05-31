'use client';

import React from 'react';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa6';
import styles from './SocialFeed.module.css';

const feed = [
  { img: '/images/product-hero.png', handle: '@furlivo_fam' },
  { img: '/images/cat-lifestyle.png', handle: '@purrfect_pets' },
  { img: '/images/lifestyle.png', handle: '@golden_retriever_daily' },
  { img: '/images/flatlay.png', handle: '@grooming_essentials' }
];

export default function SocialFeed() {
  return (
    <section className={styles.section} aria-label="Social Feed">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Join the Community</h2>
          <p className={styles.subtitle}>Tag @furlivo on Instagram to be featured.</p>
        </div>
        
        <div className={styles.grid}>
          {feed.map((post, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.imgWrap}>
                <Image src={post.img} alt={`Instagram post by ${post.handle}`} fill className={styles.img} sizes="(max-width: 768px) 50vw, 25vw" />
                <div className={styles.overlay}>
                  <FaInstagram size={28} color="#fff" />
                  <span className={styles.handle}>{post.handle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
