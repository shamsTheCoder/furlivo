import { Suspense } from 'react';
import LoginPage from './LoginPage';

export const metadata = { title: 'Admin Sign In' };

export default function LoginRoute() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
