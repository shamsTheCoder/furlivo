'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import Spinner from '@/components/shared/Spinner';
import {
  HiStar, HiTruck, HiShieldCheck, HiArrowPath,
  HiBolt, HiChevronRight, HiMinus, HiPlus,
  HiShoppingBag, HiHeart,
} from 'react-icons/hi2';
import { RiSecurePaymentLine } from 'react-icons/ri';
import styles from './ProductPage.module.css';

const images = [
  { src: '/images/product-hero.png', alt: 'Furlivo Steam Pet Grooming Brush — active steam spray' },
  { src: '/images/flatlay.png',      alt: 'Furlivo Steam Grooming Brush flat lay with USB-C charging cable' },
  { src: '/images/lifestyle.png',    alt: 'Removing shedding fur with Furlivo Steam Grooming Brush on a golden retriever' },
  { src: '/images/cat-lifestyle.png',alt: 'Removing shedding fur with Furlivo Steam Grooming Brush on a Persian cat' },
];

const variants = [
  { id: 'sage',    label: 'Sage Green',   color: '#9DB5A3', imgIndex: 0 },
  { id: 'cream',   label: 'Cream White',  color: '#F5F0E8', imgIndex: 1 },
  { id: 'espresso',label: 'Espresso',     color: '#5C4A36', imgIndex: 2 },
];

const highlights = [
  { Icon: HiBolt,         text: '90% fur reduction in one pass' },
  { Icon: HiTruck,        text: 'Free delivery above ₹2,999' },
  { Icon: HiArrowPath,    text: '30-day money-back guarantee' },
  { Icon: HiShieldCheck,  text: 'Vet-recommended silicone bristles' },
];

export default function ProductPageClient() {
  const [activeImg, setActiveImg]         = useState(0);
  const [activeVariant, setActiveVariant]   = useState('sage');
  const [qty, setQty]                       = useState(1);
  const [addedToCart, setAddedToCart]       = useState(false);
  const [isBuyingNow, setIsBuyingNow]       = useState(false);

  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const unitPrice = 2399;

  const handleVariantChange = (v: typeof variants[0]) => {
    setActiveVariant(v.id);
    if (v.imgIndex !== undefined) {
      setActiveImg(v.imgIndex);
    }
  };

  const addToCart = () => {
    addItem({
      productId: 'steam-grooming-brush',
      variantId: activeVariant,
      name: 'Steam Grooming Brush',
      variantName: variants.find(v => v.id === activeVariant)?.label,
      price: unitPrice,
      quantity: qty,
      imageUrl: images[activeImg]!.src,
      slug: 'steam-grooming-brush'
    });
  };

  const handleAddToCart = () => {
    addToCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    setIsBuyingNow(true);
    addToCart();
    router.push('/checkout');
  };

  const total = unitPrice * qty;
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className={styles.page}>

      {/* Breadcrumb */}
      <div className={`container ${styles.breadcrumb}`}>
        <Link href="/">Home</Link>
        <HiChevronRight size={14} />
        <Link href="/products">Shop</Link>
        <HiChevronRight size={14} />
        <span>Steam Grooming Brush</span>
      </div>

      <div className={`container ${styles.layout}`}>

        {/* ── Gallery ─────────────────────────────── */}
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
                aria-label={img.alt}
              >
                <Image src={img.src} alt={img.alt} fill className={styles.thumbImg} sizes="80px" />
              </button>
            ))}
          </div>

          <div className={styles.mainImg}>
            <Image
              src={images[activeImg]!.src}
              alt={images[activeImg]!.alt}
              fill priority
              className={styles.mainImgEl}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`badge badge-orange ${styles.saleBadge}`}>Save ₹1,000</div>
          </div>
        </div>

        {/* ── Product Info ─────────────────────────── */}
        <div className={styles.info}>

          {/* Rating */}
          <Link href="#reviews" className={styles.ratingRow}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={14} style={{ color: '#F59E0B' }} />
              ))}
            </div>
            <span className={styles.ratingScore}>4.9</span>
            <span className={styles.ratingCount}>2,847 reviews</span>
          </Link>

          <h1 className={styles.title}>Steam Pet Grooming Brush</h1>
          <p className={styles.tagline}>3-in-1 &nbsp;·&nbsp; Grooms &nbsp;·&nbsp; Moisturises &nbsp;·&nbsp; Massages</p>

          {/* Price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>{fmt(unitPrice)}</span>
            <span className={styles.comparePrice}>{fmt(3399)}</span>
            <span className={styles.savePill}>You save {fmt(1000)}</span>
          </div>
          <p className={styles.taxNote}>Inclusive of all taxes · Free delivery above ₹2,999</p>

          {/* Stock urgency */}
          <div className={styles.urgency}>
            <span className={styles.urgencyDot} />
            <span><strong>Only 23 left</strong> in stock — selling fast!</span>
          </div>

          {/* Color */}
          <div className={styles.variantSection}>
            <div className={styles.variantLabel}>
              Colour: <strong>{variants.find(v => v.id === activeVariant)?.label}</strong>
            </div>
            <div className={styles.variants}>
              {variants.map((v) => (
                <button
                  key={v.id}
                  className={`${styles.variantBtn} ${activeVariant === v.id ? styles.variantActive : ''}`}
                  onClick={() => handleVariantChange(v)}
                  title={v.label}
                  aria-label={v.label}
                  aria-pressed={activeVariant === v.id}
                  style={{ background: v.color }}
                />
              ))}
            </div>
          </div>

          {/* Qty + Add to Cart */}
          <div className={styles.addRow}>
            <div className={styles.qty}>
              <button className={styles.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">
                <HiMinus size={16} />
              </button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(qty + 1)} aria-label="Increase">
                <HiPlus size={16} />
              </button>
            </div>
            <button
              className={`btn btn-primary btn-lg ${styles.addBtn} ${addedToCart ? styles.addBtnSuccess : ''}`}
              onClick={handleAddToCart}
            >
              <HiShoppingBag size={18} />
              {addedToCart ? '✓ Added to Cart!' : `Add to Cart — ${fmt(total)}`}
            </button>
          </div>

          {/* Buy Now */}
          <button
            className="btn btn-dark btn-full btn-lg"
            onClick={handleBuyNow}
            disabled={isBuyingNow}
          >
            {isBuyingNow
              ? <><Spinner size="sm" color="white" /> Taking you to checkout…</>
              : 'Buy Now — Express Checkout'
            }
          </button>

          {/* Secure payment strip */}
          <div className={styles.secureStrip}>
            <RiSecurePaymentLine size={18} className={styles.secureIcon} />
            <span>Secure payment via UPI · Cards · Net Banking · COD</span>
          </div>

          {/* Highlights */}
          <div className={styles.highlights}>
            {highlights.map(({ Icon, text }) => (
              <div key={text} className={styles.highlight}>
                <div className={styles.highlightIcon}><Icon size={15} /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* In the box */}
          <div className={styles.inbox}>
            <div className={styles.inboxTitle}>What's in the box</div>
            <ul className={styles.inboxList}>
              {['Steam Grooming Brush', 'USB-C Charging Cable', 'User Manual (English + Hindi)', '30-Day Guarantee Card'].map(item => (
                <li key={item} className={styles.inboxItem}>
                  <span className={styles.inboxCheck}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Product Description ─────────────────────── */}
      <div className={`container ${styles.descSection}`}>
        <div className={styles.descGrid}>
          <div className={styles.descMain}>
            <h2 className={styles.descTitle}>About the Furlivo Steam Brush</h2>
            <div className={styles.descBody}>
              <p>Most grooming sessions end in a standoff. Your pet bolts, the fur flies everywhere, and you're left with a sofa that looks like a wolf lives on it. The Furlivo Steam Grooming Brush changes all of that.</p>
              <p>Fill the 80ml built-in reservoir with water or your pet's favourite conditioning serum, press the one-touch button, and watch as the cool-mist spray softens the coat while the soft silicone bristles glide effortlessly through even the thickest undercoats.</p>
              <p>The result: up to 90% less loose fur in a single 5-minute session, and a pet that actually sits still — because the massaging bristles feel incredible.</p>
            </div>

            <div className={styles.specGrid}>
              {[
                { label: 'Reservoir', value: '80ml' },
                { label: 'Battery',   value: '500mAh' },
                { label: 'Runtime',   value: '60 min' },
                { label: 'Charge',    value: '90 min (USB-C)' },
                { label: 'Handle',    value: '360° swivel' },
                { label: 'Bristles',  value: 'Food-grade silicone' },
                { label: 'Water resistance', value: 'IPX4 splash-proof' },
                { label: 'In the box', value: 'Brush + USB-C cable' },
              ].map(s => (
                <div key={s.label} className={styles.spec}>
                  <span className={styles.specLabel}>{s.label}</span>
                  <span className={styles.specValue}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.descSide}>
            <div className={styles.descImage}>
              <Image src="/images/cat-lifestyle.png" alt="Removing shedding fur with Furlivo Steam Grooming Brush on a Persian cat" fill className={styles.descImg} sizes="400px" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Mobile Bar ───────────────────────── */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyInfo}>
          <span className={styles.stickyName}>Steam Grooming Brush</span>
          <span className={styles.stickyPrice}>{fmt(unitPrice)}</span>
        </div>
        <button className={`btn btn-primary ${styles.stickyBtn}`} onClick={handleAddToCart}>
          <HiShoppingBag size={16} />
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
