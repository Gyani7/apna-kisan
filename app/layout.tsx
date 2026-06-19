
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { BottomNavbar } from '@/components/layout/BottomNavbar';
import { Footer } from '@/components/layout/Footer';
import Head from 'next/head';
import SessionProviderWrapper from './session-provider';
import { GuestProvider } from './guest-provider';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn('font-sans', GeistSans.variable)}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/mappls-gl/dist/mappls-gl.css"
        />
      </Head>
      <body className={cn(inter.className, "pb-16 md:pb-0")}>
        <SessionProviderWrapper>
          <GuestProvider>
            <ModalProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <BottomNavbar />
              <Toaster />
            </ModalProvider>
          </GuestProvider>
        </SessionProviderWrapper>
        <script src="https://unpkg.com/mappls-gl/dist/mappls-gl.js"></script>
      </body>
    </html>
  );
}
