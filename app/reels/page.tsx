'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, Heart, MessageCircle, Film } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AuthProvider from '@/components/AuthProvider';
import { getReels } from '@/lib/supabase';
import type { ReelRow } from '@/lib/database.types';
import { formatCount } from '@/lib/types';

export default function ReelsPage() {
  const [reels, setReels] = useState<(ReelRow & { profiles?: { username: string; full_name: string | null; avatar_url: string | null; badge: string } })[]>([]);

  useEffect(() => {
    getReels(20).then((data) => { if (data) setReels(data); });
  }, []);

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Kisan Reels</h1>

          {reels.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film size={36} className="text-brand-600 dark:text-brand-400" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Reels jald aa rahe hain</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Short farming videos aur tips yahan hongi!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {reels.map((reel) => {
                const author = reel.profiles;
                const authorName = author?.full_name ?? author?.username ?? 'Kisan';
                return (
                  <div key={reel.id} className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-gray-900 group cursor-pointer">
                    {reel.thumbnail_url ? (
                      <Image src={reel.thumbnail_url} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-800 to-brand-950 flex items-center justify-center">
                        <Film size={40} className="text-brand-400/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-semibold truncate">{authorName}</p>
                      {reel.caption && <p className="text-gray-200 text-xs line-clamp-1 mt-0.5">{reel.caption}</p>}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-white/80 text-xs"><Heart size={12} />{formatCount(reel.likes_count)}</span>
                        <span className="flex items-center gap-1 text-white/80 text-xs"><MessageCircle size={12} />{formatCount(reel.comments_count)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
