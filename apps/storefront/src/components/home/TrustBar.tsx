import { HiTruck, HiArrowPath, HiShieldCheck, HiStar, HiPhone } from 'react-icons/hi2';
import { RiSecurePaymentLine } from 'react-icons/ri';
import styles from './TrustBar.module.css';

const items = [
  { Icon: HiTruck,              label: 'Free Delivery',    sub: 'Orders above ₹2,999' },
  { Icon: HiArrowPath,          label: '30-Day Returns',   sub: 'No questions asked' },
  { Icon: RiSecurePaymentLine,  label: 'Secure Payments',  sub: 'UPI · Cards · COD' },
  { Icon: HiStar,               label: '4.9 / 5 Stars',   sub: '2,847 verified reviews' },
  { Icon: HiPhone,              label: 'Expert Support',   sub: 'Reply within 2 hrs' },
];

export default function TrustBar() {
  return (
    <div className={styles.bar} role="complementary" aria-label="Trust signals">
      <div className={`container ${styles.inner}`}>
        {items.map(({ Icon, label, sub }, i) => (
          <div key={label} className={styles.item}>
            {i > 0 && <div className={styles.sep} aria-hidden="true" />}
            <div className={styles.iconWrap}>
              <Icon size={18} />
            </div>
            <div className={styles.text}>
              <span className={styles.label}>{label}</span>
              <span className={styles.sub}>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
