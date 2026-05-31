import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HiArrowLeft, HiHeart } from 'react-icons/hi2';
import { HiStar } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './wishlist.module.css';

export const metadata: Metadata = { title: 'My Wishlist — Furlivo' };

const DEMO_WISHLIST = [
  {
    slug: 'steam-grooming-brush',
    name: 'Steam Pet Grooming Brush',
    desc: 'The 3-in-1 de-shedding brush with cool-mist spray. Reduces shedding by 90%.',
    price: 2399,
    comparePrice: 3399,
    rating: 4.9,
    reviewCount: 2847,
    badge: 'Bestseller',
  },
  {
    slug: 'grooming-bundle',
    name: 'The Furlivo Bundle',
    desc: 'Steam Brush + Hair Remover Roller. Everything you need, together.',
    price: 3599,
    comparePrice: 5398,
    rating: 5.0,
    reviewCount: 432,
    badge: 'Save 33%',
  },
];

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default async function WishlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirectTo=/account/wishlist');

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.backRow}>
            <Link href="/account" className={styles.backLink}>
              <HiArrowLeft size={16} /> Back to Account
            </Link>
          </div>
          <h1 className={styles.title}>My Wishlist</h1>

          {DEMO_WISHLIST.length === 0 ? (
            <div className={styles.emptyState}>
              <HiHeart size={56} className={styles.emptyIcon} />
              <h2>Your wishlist is empty</h2>
              <p>Save products you love by clicking the heart icon on any product page.</p>
              <Link href="/products" className="btn btn-primary btn-lg">Browse Products</Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {DEMO_WISHLIST.map((item) => (
                <div key={item.slug} className={styles.card}>
                  {/* Image placeholder */}
                  <Link href={`/products/${item.slug}`} className={styles.imgWrap}>
                    <div className={styles.imgPlaceholder} />
                    <span className="badge badge-orange" style={{ position: 'absolute', top: 12, left: 12 }}>
                      {item.badge}
                    </span>
                  </Link>

                  <div className={styles.cardBody}>
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <HiStar key={i} size={12} style={{ color: i < Math.round(item.rating) ? '#F59E0B' : '#D6D3D1' }} />
                        ))}
                      </div>
                      <span className={styles.ratingText}>{item.rating} ({item.reviewCount.toLocaleString()})</span>
                    </div>

                    <Link href={`/products/${item.slug}`}>
                      <h2 className={styles.name}>{item.name}</h2>
                    </Link>
                    <p className={styles.desc}>{item.desc}</p>

                    <div className={styles.priceRow}>
                      <span className={styles.price}>{fmt(item.price)}</span>
                      <span className={styles.compare}>{fmt(item.comparePrice)}</span>
                    </div>

                    <div className={styles.actions}>
                      <Link href={`/products/${item.slug}`} className="btn btn-primary btn-full">
                        Add to Cart
                      </Link>
                      <button className={styles.removeBtn} title="Remove from wishlist">
                        <HiHeart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
