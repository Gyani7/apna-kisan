
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Home, LayoutDashboard, Settings, LogOut, LogIn } from 'lucide-react';
import { useModal } from '@/components/Providers';

export function BottomNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { showPremiumModal } = useModal();

  const protectedRoutes = ['/dashboard/farmer', '/dashboard/farmer/settings'];

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (protectedRoutes.includes(href) && !session) {
      e.preventDefault();
      showPremiumModal();
    }
  };

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
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/dashboard/farmer"
          onClick={(e) => handleProtectedClick(e, '/dashboard/farmer')}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex h-full flex-col items-center justify-center gap-1 rounded-none',
            pathname === '/dashboard/farmer' && 'bg-muted'
          )}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/farmer/settings"
          onClick={(e) => handleProtectedClick(e, '/dashboard/farmer/settings')}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex h-full flex-col items-center justify-center gap-1 rounded-none',
            pathname === '/dashboard/farmer/settings' && 'bg-muted'
          )}
        >
          <Settings className="h-6 w-6" />
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
              <LogOut className="h-6 w-6" />
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
              <LogIn className="h-6 w-6" />
              <span className="text-xs">Login</span>
            </Link>
          )
        }
      </div>
    </div>
  );
}
