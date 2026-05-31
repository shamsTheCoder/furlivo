'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TbDroplet, TbPlayerPlay, TbSparkles } from 'react-icons/tb';
import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    Icon: TbDroplet,
    title: 'Fill the reservoir',
    desc: 'Add plain water or a pet-safe conditioning serum to the 80ml built-in tank. Twist open, fill, done — takes under 10 seconds.',
    tag: 'Under 10 seconds',
    tagColor: 'blue',
    img: '/images/flatlay.png',
  },
  {
    num: '02',
    Icon: TbPlayerPlay,
    title: 'Power on & brush',
    desc: 'One-touch button fires up the cool-mist spray instantly. Glide through any coat type — long, short, or double-coated — without snagging.',
    tag: 'All breeds',
    tagColor: 'orange',
    img: '/images/lifestyle.png',
  },
  {
    num: '03',
    Icon: TbSparkles,
    title: 'Watch fur lift away',
    desc: 'Soft silicone bristles massage the skin while the mist locks down static. Up to 90% less loose fur in a single 5-minute pass.',
    tag: '90% less shedding',
    tagColor: 'green',
    img: '/images/cat-lifestyle.png',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const current = steps[active]!;

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">

        {/* ── Header ─────────────────────────────────────── */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>How It Works</p>
          <h2 className={styles.title}>Spa-quality grooming in 3 simple steps</h2>
          <p className={styles.sub}>No fuss. No expensive vet visits. No fur-covered sofa.</p>
        </div>

        <div className={styles.layout}>

          {/* ── Left: Interactive Steps ─────────────────── */}
          <div className={styles.stepsCol}>

            {/* Vertical progress track */}
            <div className={styles.track} aria-hidden="true">
              <div
                className={styles.trackFill}
                style={{ height: `${((active + 1) / steps.length) * 100}%` }}
              />
            </div>

            {steps.map((s, i) => {
              const isActive = active === i;
              const isDone   = i < active;
              return (
                <button
                  key={s.num}
                  className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isDone ? styles.stepDone : ''}`}
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${s.num}: ${s.title}`}
                >
                  {/* Bullet */}
                  <div className={`${styles.bullet} ${isActive ? styles.bulletActive : ''} ${isDone ? styles.bulletDone : ''}`}>
                    {isDone ? (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l4 4 6-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <s.Icon size={16} />
                    )}
                  </div>

                  {/* Text */}
                  <div className={styles.stepContent}>
                    <div className={styles.stepRow}>
                      <span className={styles.stepNum}>{s.num}</span>
                      <span className={`${styles.stepTag} ${styles[`tag${s.tagColor}`]}`}>{s.tag}</span>
                    </div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <div className={`${styles.stepDescWrap} ${isActive ? styles.stepDescOpen : ''}`}>
                      <p className={styles.stepDesc}>{s.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* CTA */}
            <div className={styles.cta}>
              <Link href="/products/steam-grooming-brush" className="btn btn-primary btn-lg">
                Shop Now — ₹2,399
              </Link>
              <p className={styles.ctaNote}>Free delivery · 30-day money-back guarantee</p>
            </div>
          </div>

          {/* ── Right: Dynamic Image Panel ──────────────── */}
          <div className={styles.visual}>
            <div className={styles.imageCard}>

              {/* Image */}
              <div className={styles.imageWrap}>
                {/* Single image keyed on `active` \u2014 React remounts when step changes.
                  Replaces the 3-images-always-in-DOM pattern that held 3 decoded
                  bitmaps in GPU VRAM simultaneously regardless of which was visible. */}
              <Image
                key={active}
                src={steps[active]!.img}
                alt={steps[active]!.title}
                fill
                className={styles.imgActive}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
                <div className={styles.imgOverlay} />
              </div>

              {/* Floating step badge */}
              <div className={styles.badge}>
                <div className={styles.badgeIcon}>
                  {React.createElement(current.Icon, { size: 18 })}
                </div>
                <div>
                  <div className={styles.badgeStep}>Step {active + 1} of {steps.length}</div>
                  <div className={styles.badgeTitle}>{current.title}</div>
                </div>
              </div>

              {/* Dot pagination */}
              <div className={styles.dots} role="tablist" aria-label="Step navigation">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to step ${i + 1}`}
                    role="tab"
                    aria-selected={active === i}
                  />
                ))}
              </div>
            </div>

            {/* Stats strip */}
            <div className={styles.stats}>
              {[
                { value: '90%', label: 'Less shedding' },
                { value: '5 min', label: 'Per session' },
                { value: '60 min', label: 'Battery life' },
              ].map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
