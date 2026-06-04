'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Users, SquarePlus as PlusSquare, Film, User } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Post', href: '/create', icon: PlusSquare, isAction: true },
  { label: 'Reels', href: '/reels', icon: Film },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ label, href, icon: Icon, isAction }) => {
            const isActive = pathname === href;

            if (isAction) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center justify-center"
                  aria-label={label}
                >
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 active:scale-95 transition-transform">
                    <Icon size={22} className="text-white" />
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center gap-1 flex-1 py-1"
                aria-label={label}
              >
                <Icon
                  size={22}
                  className={clsx(
                    'transition-colors',
                    isActive ? 'text-green-600' : 'text-gray-400'
                  )}
                />
                <span
                  className={clsx(
                    'text-[10px] font-medium transition-colors',
                    isActive ? 'text-green-600' : 'text-gray-400'
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
