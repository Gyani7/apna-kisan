'use client';

import { useEffect, useState } from 'react';
import { Leaf, TrendingUp, CircleAlert as AlertCircle, CloudRain } from 'lucide-react';
import type { FarmingTipRow } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

async function getFarmingTips() {
    const { data } = await supabase.from('farming_tips').select('*').eq('is_active', true).limit(4);
    return data;
}

const FALLBACK_TIPS: FarmingTipRow[] = [
  { id: '1', title: 'Organic Khatad', description: 'Vermicompost se mitti ki quality 3x behtar hoti hai', icon_name: 'Leaf', color_class: 'text-green-600 bg-green-50', is_active: true, created_at: '' },
  { id: '2', title: 'Mandi Bhav', description: 'Aaj Wheat ₹2,275/quintal — kal se 2% upar', icon_name: 'TrendingUp', color_class: 'text-blue-600 bg-blue-50', is_active: true, created_at: '' },
  { id: '3', title: 'Pest Alert', description: 'Punjab mein Aphid attack ki sambhavna — sawdhan rahein', icon_name: 'AlertCircle', color_class: 'text-orange-600 bg-orange-50', is_active: true, created_at: '' },
  { id: '4', title: 'Barish Alert', description: 'Agle 3 din mein moderate barish — seedai timely karein', icon_name: 'CloudRain', color_class: 'text-sky-600 bg-sky-50', is_active: true, created_at: '' },
];

const ICON_MAP: Record<string, typeof Leaf> = { Leaf, TrendingUp, AlertCircle, CloudRain };

export default function FarmingTipsCard() {
  const [tips, setTips] = useState<FarmingTipRow[]>(FALLBACK_TIPS);

  useEffect(() => {
    getFarmingTips().then((data) => {
      if (data && data.length > 0) setTips(data);
    });
  }, []);

  return (
    <div className="card p-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-3">Aaj Ki Khaas Jaankari</h3>
      <div className="grid grid-cols-2 gap-3">
        {tips.map((tip) => {
          const Icon = ICON_MAP[tip.icon_name] ?? Leaf;
          return (
            <div key={tip.id} className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tip.color_class}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">{tip.title}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
