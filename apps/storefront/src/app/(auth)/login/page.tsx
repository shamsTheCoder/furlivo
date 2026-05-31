import { Suspense } from 'react';
import LoginPage from './LoginPage';
import PageLoader from '@/components/shared/PageLoader';

export const metadata = { title: 'Sign In' };

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
