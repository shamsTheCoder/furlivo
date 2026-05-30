'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiShoppingBag, HiMagnifyingGlass, HiUser, HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Shop', href: '/products', hasDropdown: true },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className={styles.announce}>
        <p>🎉 FREE shipping on orders above ₹2,999 &nbsp;·&nbsp; Use code <strong>FURLIVO10</strong> for 10% off</p>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>

          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Furlivo — Home">
            <div className={styles.logoMark}>F</div>
            <span className={styles.logoText}>Furlivo</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className={styles.navLink}>
                {l.label}
                {l.hasDropdown && <HiChevronDown className={styles.chevron} />}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Search">
              <HiMagnifyingGlass size={19} />
            </button>
            <Link href="/account" className={styles.iconBtn} aria-label="Account">
              <HiUser size={19} />
            </Link>
            <Link href="/cart" className={styles.cartBtn} aria-label={`Cart — ${cartCount} items`}>
              <HiShoppingBag size={19} />
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
              {menuOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className={styles.drawerOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.drawerHeader}>
          <span className={styles.logoText}>Furlivo</span>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close">
            <HiXMark size={22} />
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
            <Link href="/account" onClick={() => setMenuOpen(false)}>My Account</Link>
            <span>·</span>
            <Link href="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </div>
        </div>
      </div>
    </>
  );
}
