import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import BenefitsSection from '@/components/home/BenefitsSection';
import HowItWorks from '@/components/home/HowItWorks';
import ReviewsSection from '@/components/home/ReviewsSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'Furlivo — Steam Pet Grooming Brush | Free Shipping',
  description: 'Give your pet a spa day at home. The Furlivo Steam Grooming Brush reduces shedding by 90% with cool-mist technology. Free shipping on orders over $35.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Above-the-fold: render immediately — no Suspense */}
        <HeroSection />
        <TrustBar />

        {/*
          Below-the-fold sections are wrapped in Suspense so Next.js can
          stream the above-fold HTML to the browser instantly while the rest
          renders server-side. null fallback = no visible shift.
        */}
        <Suspense fallback={null}>
          <BenefitsSection />
          <HowItWorks />
          <ReviewsSection />
          <FAQSection />
          <NewsletterSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
