import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginPage from './LoginPage';
import PageLoader from '@/components/shared/PageLoader';

export const metadata: Metadata = {
  title: 'Sign In — Furlivo',
  description: 'Sign in to your Furlivo account to view orders, manage your wishlist, and more.',
  robots: { index: false, follow: false },
};

/**
 * Thin server wrapper that satisfies Next.js's requirement to wrap
 * useSearchParams() consumers in a <Suspense> boundary.
 */
export default function LoginRoute() {
  return (
    <Suspense fallback={<PageLoader label="Loading…" />}>
      <LoginPage />
    </Suspense>
  );
}
