import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductPageClient from './ProductPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'steam-grooming-brush' },
    { slug: 'pet-hair-remover-roller' },
    { slug: 'grooming-bundle' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} — Furlivo`,
    description: `Shop the Furlivo ${name}. The steam grooming brush that reduces shedding by 90%. Free shipping on orders over $35.`,
    openGraph: {
      title: `${name} — Furlivo`,
      description: 'Spa-quality grooming at home. The steam brush your pet will actually enjoy.',
      images: [{ url: '/images/product-hero.png', width: 1024, height: 1024, alt: `Furlivo ${name}` }],
    },
  };
}

export const revalidate = 60;

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    image: 'https://furlivo.shop/images/product-hero.png',
    description: `Shop the Furlivo ${name}. The steam grooming brush that reduces shedding by 90%.`,
    brand: {
      '@type': 'Brand',
      name: 'Furlivo',
    },
    offers: {
      '@type': 'Offer',
      url: `https://furlivo.shop/products/${slug}`,
      priceCurrency: 'INR',
      price: '2399',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <ProductPageClient />
      </main>
      <Footer />
    </>
  );
}
