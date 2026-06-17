import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { createServerClient } from '@/lib/supabase/server';
import { SignOutButton } from '@/components/SignOutButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserRole } from '@/lib/user';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Apna Kisan',
  description: 'The modern farming ecosystem.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const role = await getUserRole();

  return (
    <html lang="en" suppressHydrationWarning className={cn('font-sans', GeistSans.variable)}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">
                <Link href="/">Apna Kisan</Link>
              </h1>
              <nav className="flex items-center gap-4">
                {role === 'farmer' && (
                  <Link href="/dashboard/farmer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Farmer Dashboard
                  </Link>
                )}
                {role === 'buyer' && (
                  <Link href="/dashboard/buyer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Buyer Dashboard
                  </Link>
                )}
                {session && (
                  <>
                    <Link href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      Browse Products
                    </Link>
                    <Link href="/messages" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      My Messages
                    </Link>
                    <Link href="/mandi-rates" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      Mandi Rates
                    </Link>
                    <Link href="/community" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      Community
                    </Link>
                  </>
                )}
              </nav>
            </div>
            <div>
              {session ? (
                <SignOutButton />
              ) : (
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
