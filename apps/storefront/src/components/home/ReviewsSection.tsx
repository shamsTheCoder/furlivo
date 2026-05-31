'use client';

import { HiStar } from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ReviewsSection.module.css';

const reviews = [
  {
    name: 'Priya S.',
    city: 'Mumbai',
    rating: 5,
    title: 'My golden retriever actually loves it!',
    body: 'We used to spend 30 minutes fighting every grooming session. With Furlivo, he just sits there happily. His coat has never looked shinier.',
    img: '/images/lifestyle.png',
    verified: true,
  },
  {
    name: 'Rahul T.',
    city: 'Bengaluru',
    rating: 5,
    title: 'Worth every rupee!',
    body: 'Our Indie dog sheds like crazy in summer. This brush cut our cleanup time in half. The steam keeps fur from flying everywhere.',
    img: null,
    verified: true,
  },
  {
    name: 'Anjali K.',
    city: 'Delhi',
    rating: 5,
    title: 'My vet actually recommended this',
    body: 'After my Persian cat developed skin sensitivity from metal bristles, my vet suggested silicone. Furlivo is the best I found — she purrs the whole time.',
    img: '/images/cat-lifestyle.png',
    verified: true,
  },
  {
    name: 'Vikram R.',
    city: 'Hyderabad',
    rating: 4,
    title: 'Excellent quality, fast delivery',
    body: 'Arrived in 4 days. Build quality is very premium. USB-C charging is a huge plus. Overall extremely happy with this purchase.',
    img: null,
    verified: true,
  },
  {
    name: 'Sneha M.',
    city: 'Pune',
    rating: 5,
    title: 'Completely changed our grooming routine',
    body: "My Labrador used to run away the moment she saw the brush. With Furlivo's steam she sits still — it's like a spa day for her!",
    img: null,
    verified: true,
  },
  {
    name: 'Arjun P.',
    city: 'Chennai',
    rating: 5,
    title: 'Best pet accessory I\'ve bought',
    body: 'Three cats at home. This brush has made grooming so much faster and my cats actually seek it out now. Absolutely brilliant product.',
    img: null,
    verified: true,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <HiStar key={i} size={13} style={{ color: i < rating ? '#F59E0B' : '#D6D3D1' }} />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <Stars rating={r.rating} />
        {r.verified && <span className={styles.verified}>✓ Verified</span>}
      </div>
      <FaQuoteLeft size={18} className={styles.quoteIcon} />
      <p className={styles.body}>{r.body}</p>
      
      {r.img && (
        <div className={styles.reviewImgWrap}>
          <Image src={r.img} alt="Customer photo" fill className={styles.reviewImg} sizes="320px" />
        </div>
      )}

      <div className={styles.reviewer}>
        <div className={styles.avatar}>{r.name[0]}</div>
        <div>
          <div className={styles.name}>{r.name}</div>
          <div className={styles.city}>{r.city}</div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  // Double the array for seamless infinite marquee loop
  const row1 = [...reviews.slice(0, 3), ...reviews.slice(0, 3)];
  const row2 = [...reviews.slice(3), ...reviews.slice(3)];

  return (
    <section className={styles.section} id="reviews">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="eyebrow">Customer Reviews</p>
            <h2 className={styles.title}>12,000+ pet parents across India trust Furlivo</h2>
          </div>
          <div className={styles.overallRating}>
            <div className={styles.ratingBig}>
              <span className={styles.ratingNum}>4.9</span>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} size={20} style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <span className={styles.ratingCount}>2,847 reviews</span>
            </div>
            <Link href="/products/steam-grooming-brush#reviews" className={`btn btn-secondary btn-sm`}>
              Read all reviews
            </Link>
          </div>
        </div>
      </div>

      {/* ── Featured review + image ──────────────────────── */}
      <div className="container">
        <div className={styles.featured}>
          <div className={styles.featuredImage}>
            <Image
              src="/images/lifestyle.png"
              alt="Customer photo with Furlivo grooming brush"
              fill
              className={styles.featuredImg}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredBadge}>
              <HiStar size={14} style={{ color: '#F59E0B' }} />
              <span>Top-rated product in India</span>
            </div>
          </div>
          <div className={styles.featuredQuote}>
            <FaQuoteLeft size={36} className={styles.bigQuote} />
            <p className={styles.featuredText}>
              "We used to spend 30 minutes fighting every grooming session. With Furlivo, my golden retriever just sits there happily. His coat has never looked shinier — and I haven't found a single tuft of fur on my sofa in weeks."
            </p>
            <div className={styles.featuredReviewer}>
              <div className={styles.avatar} style={{ width: 48, height: 48, fontSize: '1.125rem' }}>P</div>
              <div>
                <div className={styles.name} style={{ fontSize: '1rem' }}>Priya S.</div>
                <div className={styles.city}>Mumbai, Maharashtra · Golden Retriever owner</div>
                <Stars rating={5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee rows ────────────────────────────────── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrack}>
            {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
            {row2.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>
      </div>

    </section>
  );
}
