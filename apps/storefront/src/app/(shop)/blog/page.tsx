import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HiArrowRight, HiClock, HiTag } from 'react-icons/hi2';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — Furlivo Pet Care Tips',
  description: 'Expert tips on pet grooming, shedding solutions, and keeping your home fur-free. From the Furlivo team.',
};

const posts = [
  {
    slug: 'how-to-reduce-pet-shedding',
    title: 'How to Reduce Pet Shedding by 90% (Without Vacuuming Every Day)',
    excerpt: 'Shedding is normal — but drowning in fur doesn\'t have to be. Here are the grooming habits that actually work for double-coated breeds.',
    category: 'Grooming Tips',
    readTime: '5 min read',
    date: 'May 28, 2026',
    featured: true,
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
  },
  {
    slug: 'best-grooming-routine-for-cats',
    title: 'The 5-Minute Cat Grooming Routine That Actually Works',
    excerpt: 'Cats hate being groomed — until they don\'t. Here\'s how to build a routine that keeps your cat calm, clean, and shedding-free.',
    category: 'Cat Care',
    readTime: '4 min read',
    date: 'May 20, 2026',
    featured: false,
    gradient: 'linear-gradient(135deg, #9DB5A3 0%, #7A9B8A 100%)',
  },
  {
    slug: 'steam-vs-dry-brush-grooming',
    title: 'Steam Grooming vs Dry Brushing: Which is Better for Your Pet?',
    excerpt: 'Both have their place — but for most pets, one is dramatically more effective. We break down the science and the real-world results.',
    category: 'Product Guides',
    readTime: '6 min read',
    date: 'May 14, 2026',
    featured: false,
    gradient: 'linear-gradient(135deg, #F5F0E8 0%, #EDE5DC 100%)',
  },
  {
    slug: 'grooming-anxious-pets',
    title: 'How to Groom an Anxious Pet Without the Drama',
    excerpt: 'If your dog bolts at the sight of a brush, this guide is for you. Practical desensitisation techniques from a certified pet behaviourist.',
    category: 'Pet Behaviour',
    readTime: '7 min read',
    date: 'May 7, 2026',
    featured: false,
    gradient: 'linear-gradient(135deg, #5C4A36 0%, #3D3028 100%)',
  },
  {
    slug: 'fur-on-furniture-solutions',
    title: '7 Proven Ways to Keep Pet Fur Off Your Furniture',
    excerpt: 'From the right covers to grooming frequency — here\'s the complete guide to a fur-free home without sacrificing your pet\'s freedom.',
    category: 'Home Tips',
    readTime: '4 min read',
    date: 'Apr 29, 2026',
    featured: false,
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #E5521E 100%)',
  },
  {
    slug: 'furlivo-steam-brush-review',
    title: 'We Tested the Furlivo Steam Brush on 6 Different Breeds — Here\'s What We Found',
    excerpt: 'From a Maltese to a Husky, we put the Steam Grooming Brush through its paces over 3 months. The results surprised even us.',
    category: 'Product Guides',
    readTime: '8 min read',
    date: 'Apr 22, 2026',
    featured: false,
    gradient: 'linear-gradient(135deg, #9DB5A3 0%, #6D9079 100%)',
  },
];

const categories = ['All', 'Grooming Tips', 'Cat Care', 'Pet Behaviour', 'Home Tips', 'Product Guides'];

export default function BlogPage() {
  const featured = posts[0]!;
  const rest = posts.slice(1);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <p className="eyebrow">Furlivo Journal</p>
            <h1 className={styles.heroTitle}>Tips, guides, and grooming wisdom</h1>
            <p className={styles.heroCopy}>
              Expert advice on pet care, shedding, and everything in between — from a team that genuinely loves animals.
            </p>
          </div>
        </section>

        <section className={`section ${styles.blogSection}`}>
          <div className="container">
            {/* Category Filter (visual only) */}
            <div className={styles.categories}>
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${i === 0 ? styles.catBtnActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredBg} style={{ background: featured.gradient }} />
              <div className={styles.featuredBody}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>
                    <HiTag size={12} /> {featured.category}
                  </span>
                  <span className={styles.readTime}>
                    <HiClock size={12} /> {featured.readTime}
                  </span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.readMore}>
                  Read Article <HiArrowRight size={16} />
                </div>
              </div>
            </Link>

            {/* Grid */}
            <div className={styles.grid}>
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div
                    className={styles.postCardImg}
                    style={{ background: post.gradient }}
                  />
                  <div className={styles.postCardBody}>
                    <div className={styles.postMeta}>
                      <span className={styles.category}>
                        <HiTag size={11} /> {post.category}
                      </span>
                      <span className={styles.readTime}>
                        <HiClock size={11} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postDate}>{post.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className={`section ${styles.newsletterSection}`}>
          <div className="container">
            <div className={styles.newsletterBox}>
              <h2 className={styles.newsletterTitle}>Get grooming tips in your inbox</h2>
              <p className={styles.newsletterCopy}>Join 12,000+ pet parents. One email a week. Unsubscribe anytime.</p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`input ${styles.newsletterInput}`}
                  id="blog-newsletter-email"
                />
                <button type="submit" className="btn btn-primary btn-lg">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
