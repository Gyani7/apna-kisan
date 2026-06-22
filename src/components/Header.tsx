
'use client';
import { MainNav } from '@/components/MainNav';
import { UserNav } from '@/components/common/UserNav';

export default function Header() {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <MainNav />
            <div className="flex flex-1 items-center justify-end space-x-4">
                <UserNav />
            </div>
        </div>
    </header>
  );
}
