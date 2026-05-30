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
  await params; // resolve params
  return (
    <>
      <Header />
      <main>
        <ProductPageClient />
      </main>
      <Footer />
    </>
  );
}
