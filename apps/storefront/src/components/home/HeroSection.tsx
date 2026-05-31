'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiStar } from 'react-icons/hi2';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={`container ${styles.container}`}>

        {/* ── Left Column: Copy ─────────────────────────────── */}
        <div className={styles.copy}>

          {/* Social proof pill */}
          <div className={styles.proofPill}>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={14} style={{ color: '#F59E0B' }} />
              ))}
            </div>
            <span><strong>4.9</strong> · Loved by 12,000+ pet parents</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            Give Your Pet a{' '}
            <span className={styles.accentWrap}>
              <span className={styles.accent}>Spa Day</span>
              <svg className={styles.underline} viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,15 Q100,5 195,15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>{' '}
            at Home
          </h1>

          <p className={styles.sub}>
            The steam grooming brush that makes shedding season effortless.
            Silicone bristles + cool-mist spray = a pet that <em>loves</em> being groomed.
          </p>

          {/* Price row */}
          <div className={styles.priceRow}>
            <span className={styles.price}>₹2,399</span>
            <span className={styles.comparePrice}>₹3,399</span>
            <span className={styles.saveBadge}>Save ₹1,000</span>
          </div>

          {/* CTA buttons */}
          <div className={styles.ctaRow}>
            <Link href="/products/steam-grooming-brush" className={`btn btn-primary btn-xl ${styles.mainCta}`}>
              Add to Cart — ₹2,399
            </Link>
            <Link href="#how-it-works" className={`btn btn-secondary btn-xl`}>
              See How It Works
            </Link>
          </div>

          {/* Trust bullets */}
          <div className={styles.trustBullets}>
            <span>🚚 Free delivery above ₹2,999</span>
            <span className={styles.bulletSeparator}>|</span>
            <span>🛡️ 30-day guarantee</span>
            <span className={styles.bulletSeparator}>|</span>
            <span>⚡️ Ships within 24 hrs</span>
          </div>
        </div>

        {/* ── Right Column: Product Image ───────────────────── */}
        <div className={styles.visual}>
          <div className={styles.imageBg}>
            {/* The white square box shown in screenshot */}
          </div>

          <div className={styles.imageWrap}>
            <Image
              src="/images/product-hero.png"
              alt="Furlivo Steam Pet Grooming Brush"
              width={650}
              height={650}
              priority
              className={styles.productImage}
            />
          </div>

          {/* Floating cards (Glassmorphism) */}
          <div className={`${styles.floatingCard} ${styles.card1}`}>
            <div className={styles.cardIconWrap}>💨</div>
            <div>
              <div className={styles.cardTitle}>Steam Spray</div>
              <div className={styles.cardSub}>Anti-static mist</div>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.card2}`}>
            <div className={styles.cardIconWrap}>✂️</div>
            <div>
              <div className={styles.cardTitle}>90% Less Shedding</div>
              <div className={styles.cardSub}>Clinically tested</div>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.card3}`}>
            <div className={styles.cardIconWrapStar}><HiStar size={20} color="#F59E0B" /></div>
            <div>
              <div className={styles.cardTitle}>4.9 / 5</div>
              <div className={styles.cardSub}>2,847 reviews</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom wave removed, transition to TrustBar is cleaner flat */}
    </section>
  );
}
