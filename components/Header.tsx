'use client';

import { useAuth } from '@/components/AuthProvider';
import { cn } from '@/lib/utils';
import { CommandMenu } from '@/components/CommandMenu';
import { buttonVariants } from '@/components/ui/button';
import { MainNav } from '@/components/MainNav';
import { MobileNav } from '@/components/MobileNav';
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
import { siteConfig } from '@/config/site';

export default function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  if (pathname.includes('auth')) {
    return null;
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.user_metadata.avatar_url} />
                    <AvatarFallback>
                      {user.user_metadata.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth"
                className={cn(buttonVariants({ variant: 'secondary' }), 'px-4')}
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
