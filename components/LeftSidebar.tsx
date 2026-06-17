'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Users, SquarePen as PenSquare, Compass, User, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { CATEGORIES } from '@/components/questions/GuestQuestionForm';

const NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Write', href: '/create', icon: PenSquare },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col gap-1 w-56 shrink-0 sticky top-20">
      {NAV.map(({ label, href, icon: Icon }) => (
        <Link key={href} href={href} className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
          pathname === href ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}>
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}

      <hr className="my-2 border-gray-200 dark:border-gray-700" />

      <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Categories</p>
      {CATEGORIES.slice(0, 6).map((cat) => (
        <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="text-base">{cat.icon}</span>
          <span>{cat.nameHi}</span>
        </Link>
      ))}

      <hr className="my-2 border-gray-200 dark:border-gray-700" />

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </aside>
  );
}
