'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { SiVisa, SiMastercard, SiRazorpay } from 'react-icons/si';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import styles from './Footer.module.css';

const links = {
  Shop: [
    { label: 'Steam Grooming Brush', href: '/products/steam-grooming-brush' },
    { label: 'Hair Remover Roller', href: '/products/pet-hair-remover-roller' },
    { label: 'Bundle Deal', href: '/products/grooming-bundle' },
    { label: 'All Products', href: '/products' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Your Order', href: '/order-tracking' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Contact Us', href: 'mailto:hello@furlivo.shop' },
  ],
  Company: [
    { label: 'About Furlivo', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const social = [
  { Icon: FaInstagram, href: 'https://instagram.com/furlivo.shop', label: 'Instagram' },
  { Icon: FaTiktok,    href: 'https://tiktok.com/@furlivo.shop',   label: 'TikTok' },
  { Icon: FaYoutube,   href: 'https://youtube.com/@furlivo',       label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.top}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>F</div>
            <span className={styles.logoName}>Furlivo</span>
          </Link>
          <p className={styles.tagline}>
            Spa-quality grooming, at home, for the pet you love. We make shedding season effortless.
          </p>
          
          {/* Integrated Newsletter / Email capture */}
          {status === 'success' ? (
            <div className={styles.miniSuccess}>
              <span style={{ color: 'var(--success)' }}>✓</span> You're on the list!
            </div>
          ) : (
            <form className={styles.miniNewsletter} onSubmit={handleSubmit}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className={styles.miniInputGroup}>
                <input 
                  type="email" 
                  id="footer-email" 
                  placeholder="Enter email for 15% off" 
                  required 
                  className={styles.miniInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button type="submit" className={styles.miniSubmit} disabled={status === 'loading'}>
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </div>
            </form>
          )}

          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <MdEmail size={16} className={styles.contactIcon} />
              <a href="mailto:hello@furlivo.shop">hello@furlivo.shop</a>
            </div>
            <div className={styles.contactItem}>
              <MdLocationOn size={16} className={styles.contactIcon} />
              <span>Ships securely across India</span>
            </div>
          </div>
          <div className={styles.socials}>
            {social.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className={styles.linksWrapper}>
          {Object.entries(links).map(([col, items]) => (
            <div key={col} className={styles.linkCol}>
              <h3 className={styles.colTitle}>{col}</h3>
              <ul className={styles.linkList}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.link}>
                      <span className={styles.linkText}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Furlivo. All rights reserved. Designed in India.
          </p>
          <div className={styles.payments}>
            <div className={styles.payIcon} title="UPI"><span style={{ fontWeight: 800, fontSize: '10px' }}>UPI</span></div>
            <SiVisa size={32} className={styles.payIcon} title="Visa" />
            <SiMastercard size={32} className={styles.payIcon} title="Mastercard" />
            <SiRazorpay size={32} className={styles.payIcon} title="Razorpay" />
            <div className={styles.payIcon} title="Cash on Delivery">
              <RiMoneyRupeeCircleLine size={24} style={{ marginRight: 2 }} />
              <span style={{ fontWeight: 700, fontSize: '10px' }}>COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
