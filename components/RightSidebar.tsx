'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Droplets, TrendingUp, TrendingDown, Trophy, ArrowUpRight } from 'lucide-react';
import { getMandiRates, getLeaderboard } from '@/lib/supabase';
import type { MandiRateRow, ProfileRow } from '@/lib/database.types';

const WEATHER_DATA = {
  location: 'Amritsar, Punjab',
  temp: 32,
  condition: 'Partly Cloudy',
  humidity: 68,
};

const FALLBACK_RATES: MandiRateRow[] = [
  { id: '1', commodity: 'Wheat', mandi: 'Amritsar', state: 'Punjab', price: 2275, change_percent: 2.0, updated_at: '' },
  { id: '2', commodity: 'Cotton', mandi: 'Warangal', state: 'Telangana', price: 6820, change_percent: 3.2, updated_at: '' },
  { id: '3', commodity: 'Rice', mandi: 'Karnal', state: 'Haryana', price: 3186, change_percent: -0.5, updated_at: '' },
  { id: '4', commodity: 'Mustard', mandi: 'Jaipur', state: 'Rajasthan', price: 5450, change_percent: -1.2, updated_at: '' },
];

export default function RightSidebar() {
  const [rates, setRates] = useState<MandiRateRow[]>(FALLBACK_RATES);
  const [leaders, setLeaders] = useState<ProfileRow[]>([]);

  useEffect(() => {
    getMandiRates().then((data) => { if (data && data.length > 0) setRates(data); });
    getLeaderboard(5).then((data) => { if (data) setLeaders(data); });
  }, []);

  return (
    <aside className="hidden xl:flex flex-col gap-4 w-72 shrink-0 sticky top-20">
      {/* Weather */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-700 dark:from-brand-800 dark:to-brand-900 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-brand-200 font-medium">{WEATHER_DATA.location}</p>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-4xl font-bold">{WEATHER_DATA.temp}&deg;</span>
              <span className="text-sm text-brand-200 mb-1">C</span>
            </div>
            <p className="text-sm text-brand-100">{WEATHER_DATA.condition}</p>
          </div>
          <Sun size={48} className="text-yellow-300 opacity-90" />
        </div>
        <div className="flex items-center gap-1 text-brand-200 text-xs mt-2">
          <Droplets size={12} />
          <span>Humidity: {WEATHER_DATA.humidity}%</span>
        </div>
      </div>

      {/* Mandi Bhav */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Mandi Bhav</h3>
          <Link href="/explore" className="text-xs text-brand-600 dark:text-brand-400 font-medium flex items-center gap-0.5 hover:underline">Sab dekhen <ArrowUpRight size={12} /></Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {rates.slice(0, 4).map((rate) => (
            <div key={rate.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{rate.commodity}</p>
                <p className="text-[11px] text-gray-400">{rate.mandi}, {rate.state}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">&₹{rate.price.toLocaleString()}</p>
                <span className={`text-[11px] font-medium flex items-center gap-0.5 justify-end ${rate.change_percent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {rate.change_percent >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(rate.change_percent)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Top Kisans</h3>
          <Trophy size={16} className="text-earth-500" />
        </div>
        <div className="flex flex-col gap-2.5">
          {leaders.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">Leaderboard jald banega</p>
          )}
          {leaders.map((leader, i) => (
            <Link key={leader.id} href={`/profile/${leader.id}`} className="flex items-center justify-between group">
              <div className="flex items-center gap-2.5">
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${i === 0 ? 'bg-earth-400 text-white' : i === 1 ? 'bg-gray-300 text-white' : i === 2 ? 'bg-soil-400 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{i + 1}</span>
                {leader.avatar_url ? (
                  <Image src={leader.avatar_url} alt="" width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">{(leader.full_name ?? leader.username)[0]}</div>
                )}
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight group-hover:underline">{leader.full_name ?? leader.username}</p>
                  <p className="text-[11px] text-gray-400">{leader.reputation} pts</p>
                </div>
              </div>
              <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">{leader.badge}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
