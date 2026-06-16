import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Providers } from '@/components/Providers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="black"
        />
      </Head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <TailwindIndicator />
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
