import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Your Cart — Furlivo',
  description: 'Review your items and proceed to secure checkout.',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main>
        <CartPageClient />
      </main>
      <Footer />
    </>
  );
}
