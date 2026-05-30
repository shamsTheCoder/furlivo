import { HiBolt, HiOutlineScissors, HiOutlineArrowPath, HiOutlineBeaker, HiOutlineCpuChip, HiOutlineShieldCheck } from 'react-icons/hi2';
import { TbWind, TbDog } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BenefitsSection.module.css';

const features = [
  {
    Icon: HiBolt,
    title: 'One-Touch Steam Spray',
    desc: '80ml cool-mist reservoir. Fill with water or pet serum and press once.',
    accent: true,
  },
  {
    Icon: HiOutlineScissors,
    title: '90% Less Shedding',
    desc: 'Silicone bristles penetrate the undercoat and capture loose fur without scratching.',
  },
  {
    Icon: HiOutlineArrowPath,
    title: '360° Swivel Handle',
    desc: 'Ergonomic loop rotates freely — easy on limbs, belly, face, and tail.',
  },
  {
    Icon: TbWind,
    title: 'Anti-Static Mist',
    desc: 'Micro-mist kills static so fur stays on the brush, not on your furniture.',
  },
  {
    Icon: HiOutlineCpuChip,
    title: '60-Min Battery Life',
    desc: 'USB-C charging. Full in 90 min. One-press power, LED battery indicator.',
  },
  {
    Icon: TbDog,
    title: 'Safe for All Breeds',
    desc: 'Vet-recommended food-grade silicone. Works on dogs, cats, rabbits, guinea pigs.',
  },
];

const stats = [
  { value: '90%', label: 'Less shedding' },
  { value: '5 min', label: 'Per session' },
  { value: '12K+', label: 'Happy pets' },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section} id="features">
      <div className="container">

        {/* ── Top: Wide headline row ─────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className="eyebrow">Why Furlivo</p>
            <h2 className={styles.title}>
              Everything your pet's coat needs,{' '}
              <span className={styles.accent}>all in one brush</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerSub}>
              Most pet owners spend ₹3,000+ a month on professional grooming. The Furlivo brush
              pays for itself in one session — and your pet will actually enjoy it.
            </p>
            <Link href="/products/steam-grooming-brush" className="btn btn-primary">
              Shop Now — ₹2,399
            </Link>
          </div>
        </div>

        {/* ── Bottom: Image + Feature grid ──────────────── */}
        <div className={styles.layout}>

          {/* Image column */}
          <div className={styles.imageCol}>
            <div className={styles.imageCard}>
              <Image
                src="/images/lifestyle.png"
                alt="Happy golden retriever being groomed with Furlivo steam brush"
                fill
                className={styles.img}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div className={styles.imgOverlay} />

              {/* Floating stat badges */}
              {stats.map((s) => (
                <div key={s.label} className={styles.statBadge} data-label={s.label}>
                  <span className={styles.statVal}>{s.value}</span>
                  <span className={styles.statLbl}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature list column */}
          <div className={styles.featureList}>
            {features.map((f) => (
              <div key={f.title} className={`${styles.featureItem} ${f.accent ? styles.featureAccent : ''}`}>
                <div className={`${styles.iconWrap} ${f.accent ? styles.iconAccent : ''}`}>
                  <f.Icon size={19} />
                </div>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
