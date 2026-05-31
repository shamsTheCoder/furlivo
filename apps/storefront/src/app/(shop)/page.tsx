import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/home/ProductGrid';
import BrandValues from '@/components/home/BrandValues';
import SocialFeed from '@/components/home/SocialFeed';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'Furlivo | Premium Pet Grooming Essentials',
  description: 'Shop Furlivo for premium pet grooming tools, accessories, and bundles. Give your pet a spa day at home with our bestselling steam grooming brush.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Above-the-fold: Promotional Hero Banner and Category Discovery */}
        <HeroBanner />
        <CategoryGrid />

        {/*
          Below-the-fold sections are wrapped in Suspense so Next.js can
          stream the above-fold HTML to the browser instantly while the rest
          renders server-side. null fallback = no visible shift.
        */}
        <Suspense fallback={null}>
          <ProductGrid />
          <BrandValues />
          <SocialFeed />
          <NewsletterSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
