import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { HiTruck, HiShieldCheck, HiStar } from 'react-icons/hi2';
import styles from './products.module.css';

export const metadata: Metadata = {
  title: 'Shop All Products — Furlivo',
  description: 'Browse the Furlivo collection. Free shipping on orders over $35. Premium steam grooming brushes for dogs and cats.',
};

const products = [
  {
    id: '1',
    slug: 'steam-grooming-brush',
    name: 'Steam Pet Grooming Brush',
    desc: 'The 3-in-1 de-shedding brush with cool-mist spray. Reduces shedding by 90%.',
    price: 239900,
    comparePrice: 339900,
    rating: 4.9,
    reviewCount: 2847,
    img: '/images/product-hero.png',
    badge: 'Bestseller',
    badgeType: 'orange',
  },
  {
    id: '2',
    slug: 'pet-hair-remover-roller',
    name: 'Pet Hair Remover Roller',
    desc: 'Instantly removes pet hair from furniture, clothes, and car seats. Reusable.',
    price: 149900,
    comparePrice: 199900,
    rating: 4.8,
    reviewCount: 1203,
    img: '/images/flatlay.png',
    badge: 'New Arrival',
    badgeType: 'dark',
  },
  {
    id: '3',
    slug: 'grooming-bundle',
    name: 'The Furlivo Bundle',
    desc: 'Steam Brush + Hair Remover Roller. Everything you need, together.',
    price: 359900,
    comparePrice: 539800,
    rating: 5.0,
    reviewCount: 432,
    img: '/images/lifestyle.png',
    badge: 'Save 33%',
    badgeType: 'orange',
  },
];

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>

        {/* Page header */}
        <div className={styles.pageHero}>
          <div className="container">
            <p className="eyebrow">Free Shipping Over $35</p>
            <h1 className={styles.pageTitle}>Shop Furlivo</h1>
            <p className={styles.pageSub}>Premium pet grooming tools your pet will actually enjoy</p>
          </div>
        </div>

        {/* Products */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              {products.map((p) => (
                <article key={p.id} className={styles.card}>

                  {/* Image */}
                  <Link href={`/products/${p.slug}`} className={styles.imageWrap} tabIndex={-1} aria-hidden="true">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className={styles.productImg}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`badge badge-${p.badgeType} ${styles.badge}`}>
                      {p.badge}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className={styles.cardBody}>
                    {/* Rating */}
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                        <HiStar
                          key={i}
                          size={12}
                          style={{ color: i < Math.round(p.rating) ? '#F59E0B' : '#D6D3D1' }}
                        />
                      ))}
                      </div>
                      <span className={styles.ratingText}>{p.rating} ({p.reviewCount.toLocaleString()})</span>
                    </div>

                    <Link href={`/products/${p.slug}`}>
                      <h2 className={styles.name}>{p.name}</h2>
                    </Link>
                    <p className={styles.desc}>{p.desc}</p>

                    {/* Price + CTA */}
                    <div className={styles.footer}>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>{fmt(p.price)}</span>
                        <span className={styles.compare}>{fmt(p.comparePrice)}</span>
                      </div>
                      <Link href={`/products/${p.slug}`} className="btn btn-primary btn-sm">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Trust row */}
            <div className={styles.trustRow}>
              {[
                { Icon: HiTruck,       text: 'Free delivery above ₹2,999' },
              { Icon: HiShieldCheck,  text: '30-day returns' },
              { Icon: HiStar,        text: '4.9/5 from 2,847 reviews' },
              ].map(({ Icon, text }) => (
              <div key={text} className={styles.trustItem}>
                <Icon size={16} className={styles.trustIcon} />
                <span>{text}</span>
              </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
