import { Icons } from '@/components/Icons';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function IndexPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ThemeToggle />
              {user ? (
                <UserAccountNav user={user} />
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    'px-4'
                  )}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Welcome to {siteConfig.name}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            A community-driven platform for farmers, experts, and buyers to connect, learn, and grow.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.Home className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Marketplace</h3>
            <p className="mt-2 text-muted-foreground">
              Buy and sell agricultural products directly.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.Bot className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">AI Doctor</h3>
            <p className="mt-2 text-muted-foreground">
              Get instant advice on crop diseases and pests.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.Cloudy className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Weather Forecast</h3>
            <p className="mt-2 text-muted-foreground">
              Plan your farming activities with accurate weather predictions.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.Scroll className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Government Schemes</h3>
            <p className="mt-2 text-muted-foreground">
              Stay updated on the latest schemes and subsidies for farmers.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.Users className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Community Forum</h3>
            <p className="mt-2 text-muted-foreground">
              Connect with other farmers, experts, and buyers.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Icons.BarChart className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Analytics</h3>
            <p className="mt-2 text-muted-foreground">
              Track your farm's performance and make data-driven decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
