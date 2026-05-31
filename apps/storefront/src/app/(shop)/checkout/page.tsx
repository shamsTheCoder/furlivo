import type { Metadata } from 'next';
import CheckoutPageClient from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Secure Checkout — Furlivo',
  description: 'Complete your Furlivo purchase securely.',
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
