import type { Metadata, Viewport } from 'next';

/* Fonts are self-hosted via Fontsource — no Google Fonts request at runtime,
   which keeps the storefront fast and privacy-clean in every market. */
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/parisienne/400.css';

import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/lib/cart';
import { CurrencyProvider } from '@/lib/currency';

export const metadata: Metadata = {
  metadataBase: new URL('https://hijabessentials.com'),
  title: {
    default: 'Hijab Essentials — Hijabs & Essentials, made in Cairo',
    template: '%s · Hijab Essentials',
  },
  description:
    'Considered hijabs and the essentials that go with them. Jersey, chiffon, crinkle cotton and silk — made in Cairo, shipped worldwide.',
  keywords: ['hijab', 'modest fashion', 'jersey hijab', 'chiffon hijab', 'undercap', 'Egypt', 'Cairo'],
  openGraph: {
    title: 'Hijab Essentials',
    description: 'Considered hijabs and the essentials that go with them. Made in Cairo, shipped worldwide.',
    type: 'website',
    locale: 'en_EG',
  },
  icons: { icon: '/brand/mark.png', apple: '/brand/mark.png' },
};

export const viewport: Viewport = {
  themeColor: '#101010',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <CurrencyProvider>
          <CartProvider>
            <a
              href="#main"
              className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
