
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { createBrowserClient } from '@/lib/supabase/client';
import type { MandiRateRow, ProfileRow } from '@/lib/database.types';

const supabase = createBrowserClient();

async function getMandiRates() {
    const { data } = await supabase.from('mandi_rates').select('*').order('updated_at', { ascending: false }).limit(4);
    return data;
}

async function getLeaderboard(limit = 5) {
    const { data } = await supabase.from('profiles').select('*').order('reputation', { ascending: false }).limit(limit);
    return data;
}


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
    <aside className="hidden xl:flex flex-col gap-6 w-80 shrink-0 sticky top-24">
      {/* Weather */}
       <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-primary flex items-center justify-between">
                    <span>Weather</span>
                    <Icons.weather className="w-6 h-6 text-secondary" />
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-lg text-muted-foreground">{WEATHER_DATA.location}</p>
                <p className="text-6xl font-bold text-primary my-2">{WEATHER_DATA.temp}°C</p>
                <p className="text-md text-muted-foreground">{WEATHER_DATA.condition}</p>
                <p className="text-sm text-muted-foreground/80 mt-4">Humidity: {WEATHER_DATA.humidity}%</p>
            </CardContent>
        </Card>

      {/* Mandi Bhav */}
      <Card className="glass-card">
        <CardHeader>
            <CardTitle className="text-primary flex items-center justify-between">
                <span>Mandi Prices</span>
                 <Link href="/explore" className="text-sm font-medium text-secondary hover:underline flex items-center gap-1">
                    View All <Icons.arrowUpRight size={16} />
                </Link>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {rates.slice(0, 4).map((rate) => (
            <div key={rate.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5">
              <div>
                <p className="font-semibold text-foreground">{rate.commodity}</p>
                <p className="text-xs text-muted-foreground">{rate.mandi}, {rate.state}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">&₹{rate.price.toLocaleString()}</p>
                <span className={`text-xs font-medium flex items-center gap-1 justify-end ${rate.change_percent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {rate.change_percent >= 0 ? <Icons.trendingUp size={12} /> : <Icons.trendingDown size={12} />}
                  {Math.abs(rate.change_percent)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="glass-card">
        <CardHeader>
             <CardTitle className="text-primary flex items-center justify-between">
                <span>Top Farmers</span>
                <Icons.award className="w-6 h-6 text-secondary" />
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {leaders.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Leaderboard is being prepared!</p>
          )}
          {leaders.map((leader, i) => (
            <Link key={leader.id} href={`/profile/${leader.id}`} className="flex items-center justify-between group p-2 rounded-lg hover:bg-primary/5">
                <div className="flex items-center gap-3">
                     <Avatar className="h-10 w-10 border-2 border-secondary">
                        <AvatarImage src={leader.avatar_url!} alt={leader.full_name ?? leader.username!} />
                        <AvatarFallback>{(leader.full_name ?? leader.username!)[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{leader.full_name ?? leader.username}</p>
                        <p className="text-sm text-muted-foreground">{leader.reputation} XP</p>
                    </div>
                </div>
                 <span className={`font-bold text-lg ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-400' : 'text-muted-foreground'}`}>
                    #{i + 1}
                </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
