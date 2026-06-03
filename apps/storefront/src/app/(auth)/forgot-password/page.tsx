import type { Metadata } from 'next';
import { Suspense } from 'react';
import ForgotPasswordPage from './ForgotPasswordPage';
import PageLoader from '@/components/shared/PageLoader';

export const metadata: Metadata = {
  title: 'Reset Password — Furlivo',
  description: 'Reset your Furlivo account password.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordRoute() {
  return (
    <Suspense fallback={<PageLoader label="Loading…" />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
