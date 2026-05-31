import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiHeart, HiSparkles, HiGlobeAlt, HiShieldCheck } from 'react-icons/hi2';
import { FaPaw } from 'react-icons/fa6';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Furlivo — Our Story',
  description: 'Learn about the mission behind Furlivo: to make pet grooming a joyful, spa-like experience at home for every pet and their person.',
};

const values = [
  {
    Icon: HiHeart,
    title: 'Pet-First Design',
    desc: 'Every Furlivo product is tested by real pets and their owners before it ever reaches your door. If the dog doesn\'t love it, we go back to the drawing board.',
  },
  {
    Icon: HiSparkles,
    title: 'Innovation at the Core',
    desc: 'We combine cool-mist technology with ergonomic design to create grooming tools that feel like a luxury spa — for your pet and for you.',
  },
  {
    Icon: HiShieldCheck,
    title: 'Safe & Sustainable',
    desc: 'All materials are vet-approved and food-grade. Our packaging is 100% recyclable. Good for your pet, good for the planet.',
  },
  {
    Icon: HiGlobeAlt,
    title: 'Made for India',
    desc: 'Designed and tested in India, for Indian pets and Indian homes. From hot summers to monsoon coats, we understand your furry family\'s needs.',
  },
];

const team = [
  { name: 'Arjun Mehta', role: 'Co-founder & CEO', initial: 'A' },
  { name: 'Priya Sharma', role: 'Co-founder & Head of Design', initial: 'P' },
  { name: 'Rohan Kapoor', role: 'Head of Product', initial: 'R' },
  { name: 'Sneha Iyer', role: 'Head of Customer Happiness', initial: 'S' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.pawIcon}>
                <FaPaw size={32} />
              </div>
              <p className="eyebrow">Our Story</p>
              <h1 className={styles.heroTitle}>
                Born from love for pets,<br />
                <span className={styles.accent}>Built for every home.</span>
              </h1>
              <p className={styles.heroCopy}>
                Furlivo started with a simple problem: grooming a shedding golden retriever was a 
                45-minute ordeal that left fur everywhere — and a stressed-out dog. We knew there 
                had to be a better way.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className={`section ${styles.mission}`}>
          <div className="container">
            <div className={styles.missionGrid}>
              <div className={styles.missionText}>
                <p className="eyebrow">Our Mission</p>
                <h2 className="section-title">Turn grooming into a moment of joy</h2>
                <p className={styles.copy}>
                  We believe that grooming time should be bonding time. When the right tool meets 
                  the right technique, your pet relaxes, the session ends in minutes — not hours — 
                  and your sofa stays clean.
                </p>
                <p className={styles.copy}>
                  The Furlivo Steam Grooming Brush was our answer: a 3-in-1 tool that grooms, 
                  moisturises, and massages simultaneously. The cool-mist spray softens the coat, 
                  the silicone bristles glide without pulling, and the massaging action means most 
                  pets fall asleep halfway through. That&apos;s the Furlivo experience.
                </p>
              </div>
              <div className={styles.missionStat}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>90%</div>
                  <div className={styles.statLabel}>Reduction in loose fur per session</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>2.8K+</div>
                  <div className={styles.statLabel}>Happy pet parents</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>4.9★</div>
                  <div className={styles.statLabel}>Average rating from verified buyers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <p className="eyebrow">What We Stand For</p>
              <h2 className="section-title">Our Values</h2>
            </div>
            <div className={styles.valuesGrid}>
              {values.map(({ Icon, title, desc }) => (
                <div key={title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={`section ${styles.teamSection}`}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <p className="eyebrow">The People Behind Furlivo</p>
              <h2 className="section-title">Meet Our Team</h2>
              <p className={styles.teamSub}>A small team of pet lovers on a big mission.</p>
            </div>
            <div className={styles.teamGrid}>
              {team.map(({ name, role, initial }) => (
                <div key={name} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>{initial}</div>
                  <div className={styles.teamName}>{name}</div>
                  <div className={styles.teamRole}>{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaBox}>
              <p className="eyebrow">Ready to try it?</p>
              <h2 className={styles.ctaTitle}>Experience the Furlivo difference</h2>
              <p className={styles.ctaCopy}>Free shipping · 30-day returns · 2,847 five-star reviews</p>
              <a href="/products/steam-grooming-brush" className="btn btn-primary btn-xl">
                Shop the Steam Brush
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
