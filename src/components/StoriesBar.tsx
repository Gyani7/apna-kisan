'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/config';

export default function StoriesBar() {
  return (
    <div className="card py-4">
      <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex flex-col items-center gap-1.5 shrink-0 group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-800 dark:to-brand-900 flex items-center justify-center text-xl group-hover:from-brand-200 group-hover:to-brand-300 dark:group-hover:from-brand-700 dark:group-hover:to-brand-800 transition-colors ring-2 ring-brand-300 dark:ring-brand-600 ring-offset-2 dark:ring-offset-gray-800">
              {cat.icon}
            </div>
            <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium max-w-[56px] truncate text-center">
              {cat.nameHi}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
