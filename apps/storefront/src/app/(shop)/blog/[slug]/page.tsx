import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} — Furlivo Blog`,
    description: `Read our latest article on ${name}. Expert pet care tips from Furlivo.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: name,
    image: 'https://furlivo.shop/images/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Furlivo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Furlivo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://furlivo.shop/favicon.ico',
      },
    },
    datePublished: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container" style={{ padding: '80px 20px', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>{name}</h1>
        <p>This is a placeholder for the blog post content. The full article content will go here.</p>
        <div style={{ marginTop: '40px' }}>
          <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
