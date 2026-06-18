
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  const { data: session } = useSession();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to Apna Kisan
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A modern AgriTech Super Platform for farmers, buyers, traders, and
          administrators.
        </p>
      </div>
      <div className="flex gap-4">
        {
          session ? (
            <Link
              href="/dashboard/farmer"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                Get Started
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Register
              </Link>
            </>
          )
        }
      </div>
    </section>
  );
}
