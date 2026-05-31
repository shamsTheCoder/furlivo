'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  HiShoppingBag,
  HiMagnifyingGlass,
  HiUser,
  HiBars3,
  HiXMark,
  HiChevronDown,
  HiOutlineSparkles,
  HiOutlineGift,
  HiOutlineCube,
  HiOutlineHeart,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import { useCartStore } from '@/store/cart.store';
import { useAuth } from '@/components/layout/AuthProvider';
import styles from './Header.module.css';

const announcements = [
  <><HiOutlineSparkles style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> FREE shipping on orders above ₹2,999</>,
  <><HiOutlineGift style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Use code <strong>FURLIVO10</strong> for 10% off your first order</>,
];

const navLinks = [
  { label: 'Shop', href: '/products', hasDropdown: true },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Blog', href: '/blog' },
];

const megaMenuProducts = [
  { name: 'Steam Grooming Brush', href: '/products/steam-grooming-brush', img: '/images/product-hero.png', price: '₹2,399', isBestseller: true },
  { name: 'Pet Hair Remover Roller', href: '/products/pet-hair-remover-roller', img: '/images/lifestyle.png', price: '₹1,499' },
  { name: 'Ultimate Grooming Bundle', href: '/products/grooming-bundle', img: '/images/flatlay.png', price: '₹3,599', isValue: true },
];

export default function Header() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const [signingOut, setSigningOut] = useState(false);

  const storeCount = useCartStore((s) => s.itemCount);

  // Hydration-safe cart count
  useEffect(() => {
    setCartCount(storeCount);
  }, [storeCount]);

  // Announcement auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smart scroll: hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = 0;
    const handler = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 10);
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  // Derive user initials for avatar
  const userInitial = user?.user_metadata?.first_name?.[0]
    ?? user?.email?.[0]
    ?? '?';

  return (
    <>
      {/* Announcement Bar */}
      <div className={styles.announceWrap}>
        <div className={styles.announceInner}>
          {announcements.map((msg, i) => (
            <p
              key={i}
              className={`${styles.announceMsg} ${i === announceIndex ? styles.announceActive : ''}`}
              aria-hidden={i !== announceIndex}
            >
              {msg}
            </p>
          ))}
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>

          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Furlivo — Home">
            <div className={styles.logoMark}>F</div>
            <span className={styles.logoText}>Furlivo</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            {navLinks.map((l) => (
              <div key={l.label} className={styles.navItemWrap}>
                <Link href={l.href} className={styles.navLink}>
                  {l.label}
                  {l.hasDropdown && <HiChevronDown size={14} className={styles.chevron} />}
                </Link>

                {/* Mega Menu Dropdown */}
                {l.hasDropdown && (
                  <div className={styles.megaMenu}>
                    <div className={styles.megaMenuInner}>
                      {megaMenuProducts.map((p) => (
                        <Link key={p.name} href={p.href} className={styles.megaCard}>
                          <div className={styles.megaImgWrap}>
                            <Image src={p.img} alt={p.name} fill className={styles.megaImg} />
                            {p.isBestseller && <span className={styles.megaBadge}>Bestseller</span>}
                            {p.isValue && <span className={`${styles.megaBadge} ${styles.megaBadgeGreen}`}>Best Value</span>}
                          </div>
                          <div className={styles.megaInfo}>
                            <span className={styles.megaName}>{p.name}</span>
                            <span className={styles.megaPrice}>{p.price}</span>
                          </div>
                        </Link>
                      ))}
                      <div className={styles.megaAll}>
                        <Link href="/products" className="btn btn-secondary btn-full">
                          Shop All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Search">
              <HiMagnifyingGlass size={20} />
            </button>

            {/* Auth-aware icon area */}
            {!loading && (
              user ? (
                /* ── Logged-in: Avatar + Dropdown ── */
                <div className={styles.userMenuWrap}>
                  <button
                    className={styles.avatarBtn}
                    aria-label="Account menu"
                    aria-haspopup="true"
                  >
                    {userInitial}
                  </button>
                  <div className={styles.userDropdown} role="menu">
                    <div className={styles.dropdownEmail} title={user.email}>
                      {user.email}
                    </div>
                    <Link href="/account" className={styles.dropdownItem} role="menuitem">
                      <HiUser size={16} /> My Account
                    </Link>
                    <Link href="/account/orders" className={styles.dropdownItem} role="menuitem">
                      <HiOutlineCube size={16} /> My Orders
                    </Link>
                    <Link href="/account/wishlist" className={styles.dropdownItem} role="menuitem">
                      <HiOutlineHeart size={16} /> Wishlist
                    </Link>
                    <Link href="/account/settings" className={styles.dropdownItem} role="menuitem">
                      <HiOutlineCog6Tooth size={16} /> Settings
                    </Link>
                    <button
                      className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                      onClick={handleSignOut}
                      disabled={signingOut}
                      role="menuitem"
                    >
                      {signingOut ? '…' : <HiOutlineArrowRightOnRectangle size={16} />} {signingOut ? 'Signing out' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Guest: Sign In link ── */
                <Link href="/login" className={styles.signInLink} aria-label="Sign in">
                  <HiUser size={18} /> Sign In
                </Link>
              )
            )}

            {/* Loading placeholder to prevent layout shift */}
            {loading && (
              <div style={{ width: 44, height: 44 }} />
            )}

            <Link href="/cart" className={styles.cartBtn} aria-label={`Cart — ${cartCount} items`}>
              <HiShoppingBag size={20} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
            <Link href="/products/steam-grooming-brush" className={`btn btn-primary btn-sm hide-mobile ${styles.shopCta}`}>
              Shop Now
            </Link>

            <button
              className={`${styles.menuToggle} show-mobile`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className={styles.drawerOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.drawerHeader}>
          <span className={styles.logoText}>Furlivo</span>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close">
            <HiXMark size={24} />
          </button>
        </div>
        <nav className={styles.drawerNav}>
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <Link href="/products/steam-grooming-brush" className="btn btn-primary btn-full btn-lg" onClick={() => setMenuOpen(false)}>
            Shop Now — ₹2,399
          </Link>
          <div className={styles.drawerMeta}>
            {user ? (
              <>
                <Link href="/account" onClick={() => setMenuOpen(false)}>My Account</Link>
                <span>·</span>
                <button
                  onClick={() => { setMenuOpen(false); handleSignOut(); }}
                  style={{ color: 'inherit', fontWeight: 500, fontSize: 'inherit' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <span>·</span>
                <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
            <span>·</span>
            <Link href="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </div>
        </div>
      </div>
    </>
  );
}
