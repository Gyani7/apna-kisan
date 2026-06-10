'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Trophy, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AuthProvider from '@/components/AuthProvider';
import { CATEGORIES } from '@/lib/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { MandiRateRow, ProfileRow } from '@/lib/database.types';
import Image from 'next/image';

const supabase = createClientComponentClient();

async function getMandiRates() {
  const { data } = await supabase.from('mandi_rates').select('*').limit(5);
  return data;
}

async function getLeaderboard(limit: number = 10) {
  const { data } = await supabase.from('profiles').select('*').order('reputation', { ascending: false }).limit(limit);
  return data;
}

const TRENDING_TAGS = ['#GehunKisan', '#OrganicFarming', '#MSP2026', '#WaterSaving', '#DroneSpray', '#KisanCreditCard'];

export default function ExplorePage() {
  const [rates, setRates] = useState<MandiRateRow[]>([]);
  const [leaders, setLeaders] = useState<ProfileRow[]>([]);

  useEffect(() => {
    getMandiRates().then((data) => { if (data && data.length > 0) setRates(data); });
    getLeaderboard(10).then((data) => { if (data) setLeaders(data); });
  }, []);

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Explore</h1>

          {/* Categories */}
          <section className="mb-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-3">Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className="card-hover p-4 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{cat.nameHi}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cat.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Trending Tags */}
          <section className="mb-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-3">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <Link key={tag} href={`/community?q=${tag.slice(1)}`} className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors text-sm">{tag}</Link>
              ))}
            </div>
          </section>

          {/* Mandi Bhav */}
          <section className="mb-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-3">Mandi Bhav</h2>
            <div className="card overflow-hidden">
              {rates.length === 0 ? (
                <p className="text-center text-gray-400 py-4">Mandi rates jald aa rahe hain</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {rates.map((rate) => (
                    <div key={rate.id} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{rate.commodity}</p>
                        <p className="text-xs text-gray-400">{rate.mandi}, {rate.state}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">₹{rate.price.toLocaleString()}</p>
                        <span className={`text-xs font-medium flex items-center gap-0.5 justify-end ${rate.change_percent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                          {rate.change_percent >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {Math.abs(rate.change_percent)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Leaderboard */}
          <section>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-3">Weekly Leaderboard</h2>
            <div className="card overflow-hidden">
              {leaders.length === 0 ? (
                <p className="text-center text-gray-400 py-4">Leaderboard jald banega</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {leaders.map((leader, i) => (
                    <Link key={leader.id} href={`/profile/${leader.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${i === 0 ? 'bg-earth-400 text-white' : i === 1 ? 'bg-gray-300 text-white' : i === 2 ? 'bg-soil-400 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>{i + 1}</span>
                        {leader.avatar_url ? (
                          <Image src={leader.avatar_url} alt="" width={32} height={32} className="rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">{(leader.full_name ?? leader.username)[0]}</div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{leader.full_name ?? leader.username}</p>
                          <p className="text-xs text-gray-400">{leader.reputation} reputation</p>
                        </div>
                      </div>
                      <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">{leader.badge}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
