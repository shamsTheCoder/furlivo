import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Furlivo Admin', template: '%s | Furlivo Admin' },
  description: 'Furlivo store administration panel',
  robots: { index: false, follow: false }, // never index admin
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif', background: '#0f1117' }}>
        {children}
      </body>
    </html>
  );
}
