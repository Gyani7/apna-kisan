import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/components/Providers';
import { Header } from '@/components/common/Header';
import BottomNav from '@/components/BottomNav';
import { SiteFooter } from '@/components/SiteFooter';
import SessionProviderWrapper from './session-provider';
import { GuestProvider } from './guest-provider';
import AuthProvider from '@/components/AuthProvider';
import 'geist/font/sans';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn('font-sans', GeistSans.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mappls-gl/dist/mappls-gl.css"
        />
      </head>
      <body className={cn(inter.className, "pb-16 md:pb-0")}>
        <SessionProviderWrapper>
          <GuestProvider>
            <AuthProvider>
              <ModalProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
                <BottomNav />
                <Toaster />
              </ModalProvider>
            </AuthProvider>
          </GuestProvider>
        </SessionProviderWrapper>
        <script src="https://unpkg.com/mappls-gl/dist/mappls-gl.js" defer></script>
      </body>
    </html>
  );
}
