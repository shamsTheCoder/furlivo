import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterPage from './RegisterPage';
import PageLoader from '@/components/shared/PageLoader';

export const metadata: Metadata = {
  title: 'Create an Account — Furlivo',
  description: 'Join Furlivo to track your orders, manage your wishlist, and get exclusive pet grooming tips.',
  robots: { index: false, follow: false },
};

export default function RegisterRoute() {
  return (
    <Suspense fallback={<PageLoader label="Loading…" />}>
      <RegisterPage />
    </Suspense>
  );
}
