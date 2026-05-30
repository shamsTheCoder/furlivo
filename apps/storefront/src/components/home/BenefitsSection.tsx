import { HiOutlineBeaker, HiOutlineCpuChip, HiOutlineArrowPath, HiOutlineScissors, HiBolt, HiOutlineShieldCheck } from 'react-icons/hi2';
import Image from 'next/image';
import styles from './BenefitsSection.module.css';

const features = [
  {
    Icon: HiBolt,
    title: 'One-Touch Steam Spray',
    desc: 'Built-in 80ml reservoir releases cool-mist instantly. Add water or pet-safe serum.',
    accent: true,
  },
  {
    Icon: HiOutlineScissors,
    title: '90% Less Shedding',
    desc: 'Soft silicone bristles penetrate the undercoat and lift loose hair without scratching.',
  },
  {
    Icon: HiOutlineArrowPath,
    title: '360° Swivel Handle',
    desc: 'Ergonomic loop handle rotates freely for easy use on any body part or breed.',
  },
  {
    Icon: HiOutlineBeaker,
    title: 'Anti-Static Mist',
    desc: 'Micro-mist kills static so fur stays where it belongs — not on your sofa.',
  },
  {
    Icon: HiOutlineCpuChip,
    title: '60-Min Battery Life',
    desc: 'USB-C charging. Full charge in 90 minutes. One-press power button.',
  },
  {
    Icon: HiOutlineShieldCheck,
    title: 'Safe for All Breeds',
    desc: 'Vet-recommended silicone. No metal pins. Works on dogs, cats, rabbits.',
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section} id="features">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">Why Furlivo</p>
          <h2 className={styles.title}>
            Everything your pet's coat needs,{' '}
            <span className={styles.titleAccent}>all in one brush</span>
          </h2>
        </div>

        <div className={styles.layout}>
          {/* Left: lifestyle image */}
          <div className={styles.imageCol}>
            <div className={styles.imageCard}>
              <Image
                src="/images/lifestyle.png"
                alt="Happy golden retriever being groomed with Furlivo steam brush at home"
                fill
                className={styles.img}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayBadge}>Works for dogs &amp; cats</div>
              </div>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className={styles.grid}>
            {features.map((f) => (
              <div key={f.title} className={`${styles.card} ${f.accent ? styles.cardAccent : ''}`}>
                <div className={`${styles.iconWrap} ${f.accent ? styles.iconWrapAccent : ''}`}>
                  <f.Icon size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
