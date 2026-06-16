'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';
import { POST_TYPES } from '@/lib/types';

export default function CreatePostCard() {
  const { user } = useAuth();

  const initials = user?.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'AK';

  return (
    <div className="card px-4 py-4">
      <div className="flex items-center gap-3 mb-3">
        {user?.user_metadata?.avatar_url ? (
          <Image src={user.user_metadata.avatar_url} alt="" width={40} height={40} className="rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{initials}</div>
        )}
        {user ? (
          <Link href="/create" className="flex-1 text-left px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Apni baat share karein, kisan bhai...
          </Link>
        ) : (
          <Link href="/auth" className="flex-1 text-left px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Login karein post karne ke liye
          </Link>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
        {POST_TYPES.map(({ label, labelHi, href, icon: Icon, color }) => (
          <Link key={label} href={user ? href : '/auth'} className={`flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={14} />
            </div>
            <span className="text-xs font-medium">{labelHi}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
