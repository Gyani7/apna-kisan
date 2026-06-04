'use client';

import { Leaf, TrendingUp, CircleAlert as AlertCircle, CloudRain } from 'lucide-react';

const TIPS = [
  {
    icon: Leaf,
    color: 'text-green-600 bg-green-50',
    title: 'Organic Khatad',
    desc: 'Vermicompost se mitti ki quality 3x behtar hoti hai',
  },
  {
    icon: TrendingUp,
    color: 'text-blue-600 bg-blue-50',
    title: 'Mandi Bhav',
    desc: 'Aaj Wheat ₹2,275/quintal — kal se 2% upar',
  },
  {
    icon: AlertCircle,
    color: 'text-orange-600 bg-orange-50',
    title: 'Pest Alert',
    desc: 'Punjab mein Aphid attack ki sambhavna — sawdhan rahein',
  },
  {
    icon: CloudRain,
    color: 'text-sky-600 bg-sky-50',
    title: 'Barish Alert',
    desc: 'Agle 3 din mein moderate barish — seedai timely karein',
  },
];

export default function FarmingTipsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-3">Aaj Ki Khaas Jaankari</h3>
      <div className="grid grid-cols-2 gap-3">
        {TIPS.map(({ icon: Icon, color, title, desc }) => (
          <div
            key={title}
            className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 leading-tight">{title}</p>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
