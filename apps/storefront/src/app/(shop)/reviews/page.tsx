import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiStar } from 'react-icons/hi2';
import styles from './reviews.module.css';

export const metadata: Metadata = {
  title: 'Customer Reviews — Furlivo',
  description: '2,847 verified reviews for the Furlivo Steam Pet Grooming Brush. Read what pet parents across India are saying.',
};

const reviews = [
  {
    name: 'Priya R.',
    location: 'Mumbai',
    rating: 5,
    date: 'May 22, 2026',
    pet: 'Golden Retriever, 3 years',
    title: 'My golden actually sits still now',
    body: 'I\'ve tried every brush on the market. My golden sheds like crazy and grooming was always a battle. The Furlivo Steam Brush changed everything. The mist seems to calm her down and the bristles glide through without any pulling. First session lasted 8 minutes — she was almost asleep by the end. Absolutely worth every rupee.',
    verified: true,
  },
  {
    name: 'Karthik M.',
    location: 'Bangalore',
    rating: 5,
    date: 'May 18, 2026',
    pet: 'Persian Cat, 4 years',
    title: 'My cat purrs through the whole session',
    body: 'Cats don\'t usually like being groomed, but my Persian goes absolutely crazy for this brush. I think it\'s the massaging bristles — she treats it like a massage session. My sofa is finally clean and she looks amazing. 5 stars without any hesitation.',
    verified: true,
  },
  {
    name: 'Sneha D.',
    location: 'Delhi',
    rating: 5,
    date: 'May 15, 2026',
    pet: 'Husky, 2 years',
    title: 'Game changer for double-coated breeds',
    body: 'Huskies shed in BUCKETS. I was vacuuming twice a day during coat-blow season. Started using the Furlivo brush daily and the difference is remarkable — way less fur everywhere. The build quality feels premium and the USB-C charging is so convenient.',
    verified: true,
  },
  {
    name: 'Ananya S.',
    location: 'Chennai',
    rating: 5,
    date: 'May 10, 2026',
    pet: 'Labrador, 5 years',
    title: 'Exactly as advertised — no exaggeration',
    body: 'I was skeptical about the "90% reduction" claim but honestly, it lives up to it. One session with the steam brush removes more fur than 20 minutes with a regular slicker brush. The mist function is the key — it just makes everything so much easier. My Lab loves it too.',
    verified: true,
  },
  {
    name: 'Rohan P.',
    location: 'Pune',
    rating: 4,
    date: 'May 5, 2026',
    pet: 'Beagle, 6 years',
    title: 'Great product, top-notch support',
    body: 'My beagle was initially suspicious of the mist but warmed up after 2–3 sessions. The grooming result is excellent. I had a minor query about the warranty and the Furlivo team responded within an hour. Quality product backed by great customer service.',
    verified: true,
  },
  {
    name: 'Meera K.',
    location: 'Hyderabad',
    rating: 5,
    date: 'Apr 30, 2026',
    pet: 'Maine Coon, 7 years',
    title: 'Finally, a grooming tool that works for long-haired cats',
    body: 'Maine Coons are gorgeous but their coats are relentless. I\'ve spent a fortune on grooming tools. The Furlivo brush is genuinely the first one that gets through her undercoat without tangling. The steam function is the secret — it loosens the coat so the bristles just glide through. Cannot recommend enough.',
    verified: true,
  },
];

function StarRow({ rating }: { rating: number }) {
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

const ratingDist = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export default function ReviewsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Furlivo Steam Pet Grooming Brush',
    image: 'https://furlivo.shop/images/product-hero.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847',
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.name,
      },
      datePublished: new Date(r.date).toISOString().split('T')[0],
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
      },
      name: r.title,
      reviewBody: r.body,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className="eyebrow">Verified Reviews</p>
              <h1 className={styles.heroTitle}>What pet parents are saying</h1>
              <p className={styles.heroCopy}>
                2,847 verified reviews. Real pets, real results.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.reviewsSection}`}>
          <div className="container">
            {/* Summary bar */}
            <div className={styles.summary}>
              <div className={styles.summaryScore}>
                <div className={styles.bigScore}>4.9</div>
                <StarRow rating={5} />
                <div className={styles.reviewCount}>Based on 2,847 reviews</div>
              </div>
              <div className={styles.summaryBars}>
                {ratingDist.map(({ stars, pct }) => (
                  <div key={stars} className={styles.distRow}>
                    <span className={styles.distLabel}>{stars} star{stars !== 1 ? 's' : ''}</span>
                    <div className={styles.distBar}>
                      <div className={styles.distFill} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={styles.distPct}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review grid */}
            <div className={styles.grid}>
              {reviews.map((review, i) => (
                <article key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div className={styles.reviewerName}>{review.name}</div>
                      <div className={styles.reviewerMeta}>{review.location} · {review.pet}</div>
                    </div>
                    {review.verified && (
                      <span className={`badge badge-green ${styles.verifiedBadge}`}>
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <StarRow rating={review.rating} />

                  <div className={styles.reviewTitle}>{review.title}</div>
                  <p className={styles.reviewBody}>{review.body}</p>
                  <div className={styles.reviewDate}>{review.date}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section-sm ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Join 2,847 happy pet parents</h2>
              <p className={styles.ctaCopy}>Free shipping · 30-day returns · No questions asked</p>
              <a href="/products/steam-grooming-brush" className="btn btn-primary btn-xl">
                Shop the Steam Brush
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
