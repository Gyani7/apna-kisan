
'use client';

import { useAuth } from '@/components/AuthProvider';
import { cn } from '@/lib/utils';
import { CommandMenu } from '@/components/CommandMenu';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { MainNav } from './MainNav';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const supabase = createBrowserClient();

  if (pathname?.includes('auth')) {
    return null;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <CommandMenu />
          <nav className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.name}
                    />
                    <AvatarFallback>
                      {user.user_metadata.name ? user.user_metadata.name[0] : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth"
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
  );
}
