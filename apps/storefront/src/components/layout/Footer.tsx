import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';
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
            Spa-quality grooming, at home, for the pet you love.
          </p>
          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <MdEmail size={14} />
              <a href="mailto:hello@furlivo.shop">hello@furlivo.shop</a>
            </div>
            <div className={styles.contactItem}>
              <MdLocationOn size={14} />
              <span>Ships across India</span>
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
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([col, items]) => (
          <div key={col} className={styles.linkCol}>
            <h3 className={styles.colTitle}>{col}</h3>
            <ul className={styles.linkList}>
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Furlivo. All rights reserved. · India
          </p>
          <div className={styles.payments}>
            {['UPI', 'Visa', 'Mastercard', 'Razorpay', 'COD'].map((p) => (
              <span key={p} className={styles.payBadge}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
