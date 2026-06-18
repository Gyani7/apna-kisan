
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';

export function BottomNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="grid h-16 grid-cols-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex h-full flex-col items-center justify-center gap-1 rounded-none',
            pathname === '/' && 'bg-muted'
          )}
        >
          <Icons.home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        {
          session && (
            <Link
              href="/dashboard/farmer"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex h-full flex-col items-center justify-center gap-1 rounded-none',
                pathname === '/dashboard/farmer' && 'bg-muted'
              )}
            >
              <Icons.dashboard className="h-6 w-6" />
              <span className="text-xs">Dashboard</span>
            </Link>
          )
        }
        <Link
          href="/dashboard/farmer/settings"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex h-full flex-col items-center justify-center gap-1 rounded-none',
            pathname === '/dashboard/farmer/settings' && 'bg-muted'
          )}
        >
          <Icons.settings className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </Link>
        {
          session ? (
            <Link
              href="/api/auth/signout"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex h-full flex-col items-center justify-center gap-1 rounded-none'
              )}
            >
              <Icons.logout className="h-6 w-6" />
              <span className="text-xs">Logout</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex h-full flex-col items-center justify-center gap-1 rounded-none',
                pathname === '/login' && 'bg-muted'
              )}
            >
              <Icons.login className="h-6 w-6" />
              <span className="text-xs">Login</span>
            </Link>
          )
        }
      </div>
    </div>
  );
}
