'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiStar, HiShoppingBag } from 'react-icons/hi2';
import { useCartStore } from '@/store/cart.store';
import styles from './ProductGrid.module.css';

const products = [
  {
    id: 'steam-grooming-brush',
    name: 'Steam Grooming Brush',
    price: 2399,
    compareAt: 3399,
    img: '/images/product-hero.png',
    rating: '4.9',
    reviews: 2847,
    badge: 'Bestseller'
  },
  {
    id: 'pet-hair-remover-roller',
    name: 'Pet Hair Remover Roller',
    price: 1499,
    compareAt: 1999,
    img: '/images/lifestyle.png',
    rating: '4.8',
    reviews: 1205,
    badge: ''
  },
  {
    id: 'grooming-bundle',
    name: 'Ultimate Grooming Bundle',
    price: 3599,
    compareAt: 5398,
    img: '/images/flatlay.png',
    rating: '5.0',
    reviews: 843,
    badge: 'Save 33%'
  }
];

export default function ProductGrid() {
  const addItem = useCartStore(s => s.addItem);
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleAdd = (e: React.MouseEvent, p: typeof products[0]) => {
    e.preventDefault(); // prevent navigation since card is a link
    setAddingId(p.id);
    addItem({
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: 1,
      imageUrl: p.img,
      slug: p.id
    });
    setTimeout(() => setAddingId(null), 1500);
  };

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <section className={styles.section} aria-label="Best Sellers">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Trending Now</h2>
          <Link href="/products" className={styles.viewAll}>View All Shop →</Link>
        </div>
        
        <div className={styles.grid}>
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={p.img} alt={p.name} fill className={styles.img} sizes="(max-width: 768px) 100vw, 33vw" />
                {p.badge && <span className={styles.badge}>{p.badge}</span>}
                <button 
                  className={`btn btn-primary ${styles.quickAdd} ${addingId === p.id ? styles.quickAddSuccess : ''}`}
                  onClick={(e) => handleAdd(e, p)}
                >
                  {addingId === p.id ? '✓ Added' : <><HiShoppingBag size={16} /> Quick Add</>}
                </button>
              </div>
              
              <div className={styles.info}>
                <div className={styles.ratingRow}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} size={12} style={{ color: '#F59E0B' }} />
                    ))}
                  </div>
                  <span className={styles.reviewCount}>({p.reviews})</span>
                </div>
                <h3 className={styles.name}>{p.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{fmt(p.price)}</span>
                  {p.compareAt && <span className={styles.comparePrice}>{fmt(p.compareAt)}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
