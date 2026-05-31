import PageLoader from '@/components/shared/PageLoader';

/**
 * Next.js Suspense boundary for all (auth) routes (login, register, forgot-password).
 * Shown instantly while the page component renders server-side.
 */
export default function AuthLoading() {
  return <PageLoader label="Loading…" />;
}
