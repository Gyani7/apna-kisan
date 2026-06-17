'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Users, SquarePen as PenSquare, Compass, User } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Write', href: '/create', icon: PenSquare, isAction: true },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 dark:border-gray-700 glass safe-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ label, href, icon: Icon, isAction }) => {
            const isActive = pathname === href;

            if (isAction) {
              return (
                <Link key={href} href={href} aria-label={label} className="relative -mt-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl flex items-center justify-center active:scale-95 transition-all duration-200">
                    <Icon size={24} className="text-white" />
                  </div>
                </Link>
              );
            }

            return (
              <Link key={href} href={href} aria-label={label} className="flex flex-col items-center justify-center flex-1 py-1 relative">
                {isActive && <span className="absolute top-0 w-10 h-1 rounded-full bg-brand-600" />}
                <Icon size={22} className={clsx('transition-all duration-200', isActive ? 'text-brand-600 scale-110' : 'text-gray-400 dark:text-gray-500')} />
                <span className={clsx('text-[11px] font-medium mt-1 transition-colors', isActive ? 'text-brand-600' : 'text-gray-400 dark:text-gray-500')}>
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
