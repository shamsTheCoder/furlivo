import { HiTruck, HiArrowPath, HiShieldCheck, HiStar, HiPhone } from 'react-icons/hi2';
import styles from './TrustBar.module.css';

const items = [
  { Icon: HiTruck,       label: 'Free Delivery',     sub: 'On orders above ₹2,999' },
  { Icon: HiArrowPath,   label: '30-Day Returns',     sub: 'No questions asked' },
  { Icon: HiShieldCheck, label: 'Secure Payments',    sub: 'UPI · Cards · COD' },
  { Icon: HiStar,        label: '4.9 / 5 Rating',     sub: '2,847 verified reviews' },
  { Icon: HiPhone,       label: '24 / 7 Support',     sub: 'hello@furlivo.shop' },
];

export default function TrustBar() {
  return (
    <div className={styles.bar} role="complementary" aria-label="Trust signals">
      <div className={`container ${styles.inner}`}>
        {items.map(({ Icon, label, sub }, i) => (
          <div key={label} className={styles.item}>
            <div className={styles.iconWrap}>
              <Icon size={20} />
            </div>
            <div className={styles.text}>
              <span className={styles.label}>{label}</span>
              <span className={styles.sub}>{sub}</span>
            </div>
            {i < items.length - 1 && <div className={styles.sep} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
