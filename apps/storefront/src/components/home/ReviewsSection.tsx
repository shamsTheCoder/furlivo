import { HiStar, HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import Image from 'next/image';
import styles from './ReviewsSection.module.css';

const reviews = [
  {
    name: 'Priya S.',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'My golden retriever actually loves this!',
    body: 'We used to spend 30 minutes fighting with our Golden every grooming session. With the Furlivo brush, he just sits there happily. The steam function is incredible — his coat has never looked shinier.',
    img: '/images/lifestyle.png',
    verified: true,
    date: 'May 2026',
  },
  {
    name: 'Rahul T.',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Worth every rupee — shed season sorted!',
    body: 'Our Indie dog sheds like crazy every summer. This brush cut our cleanup time in half. The steam spray keeps the fur from flying everywhere. Wish we found this years ago.',
    img: null,
    verified: true,
    date: 'May 2026',
  },
  {
    name: 'Anjali K.',
    location: 'Delhi, NCR',
    rating: 5,
    title: 'My vet actually recommended this brand',
    body: 'After my Persian cat developed skin sensitivity from a metal-bristle brush, my vet suggested silicone alternatives. Furlivo is the best one I found. Gentle, effective, she purrs the whole time.',
    img: '/images/cat-lifestyle.png',
    verified: true,
    date: 'April 2026',
  },
  {
    name: 'Vikram R.',
    location: 'Hyderabad, Telangana',
    rating: 4,
    title: 'Excellent quality, quick delivery',
    body: 'Arrived within 4 days. Build quality is excellent — feels very premium. USB-C charging is a huge plus. Slightly wish the battery indicator was clearer, but overall very happy with the purchase.',
    img: null,
    verified: true,
    date: 'April 2026',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <HiStar
          key={i}
          size={14}
          style={{ color: i < rating ? '#F59E0B' : '#D6D3D1' }}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className={styles.section} id="reviews">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">Customer Reviews</p>
          <h2 className={styles.title}>12,000+ pet parents trust Furlivo</h2>
          <div className={styles.overallRating}>
            <div className={styles.overallStars}>
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={22} style={{ color: '#F59E0B' }} />
              ))}
            </div>
            <span className={styles.overallScore}>4.9 out of 5</span>
            <span className={styles.overallCount}>Based on 2,847 reviews</span>
          </div>
        </div>

        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <div key={r.name} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
              {r.img && i === 0 && (
                <div className={styles.reviewImage}>
                  <Image src={r.img} alt={`Review photo from ${r.name}`} fill className={styles.reviewImg} sizes="(max-width: 768px) 100vw, 400px" />
                </div>
              )}
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <StarRating rating={r.rating} />
                  {r.verified && <span className={styles.verifiedBadge}>✓ Verified Purchase</span>}
                </div>
                <HiChatBubbleBottomCenterText size={20} className={styles.quoteIcon} />
                <h3 className={styles.reviewTitle}>{r.title}</h3>
                <p className={styles.reviewBody}>{r.body}</p>
                <div className={styles.reviewer}>
                  <div className={styles.reviewerAvatar}>{r.name[0]}</div>
                  <div>
                    <div className={styles.reviewerName}>{r.name}</div>
                    <div className={styles.reviewerMeta}>{r.location} · {r.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="/products/steam-grooming-brush#reviews" className="btn btn-secondary">
            Read all 2,847 reviews
          </a>
        </div>
      </div>
    </section>
  );
}
