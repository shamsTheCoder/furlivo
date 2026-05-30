import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://furlivo.shop'),
  title: { default: 'Furlivo — Steam Pet Grooming Brush', template: '%s | Furlivo' },
  description: 'The world\'s first steam grooming brush. Soft silicone bristles + cool-mist spray = a pet that loves being groomed. Free shipping over $35.',
  keywords: ['pet grooming brush', 'steam brush', 'dog grooming', 'cat grooming', 'pet hair remover', 'Furlivo'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://furlivo.shop',
    siteName: 'Furlivo',
    title: 'Furlivo — Steam Pet Grooming Brush',
    description: 'Spa-quality grooming at home. The steam brush your pet will actually enjoy.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Furlivo Steam Grooming Brush' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Furlivo — Steam Pet Grooming Brush',
    description: 'Spa-quality grooming at home. The steam brush your pet will actually enjoy.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
