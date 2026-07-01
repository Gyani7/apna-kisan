
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, CloudCog, ShieldAlert, Landmark, Wheat } from 'lucide-react';
import { InfoCard } from './InfoCard';

const infoItems = [
  { title: 'Organic Farming', description: 'Learn best practices', icon: Leaf, color: '#4CAF50' },
  { title: 'Live Mandi Rates', description: 'Track market prices', icon: TrendingUp, color: '#FF9800' },
  { title: 'Weather Alert', description: 'Get real-time updates', icon: CloudCog, color: '#2196F3' },
  { title: 'Pest Alert', description: 'Protect your crops', icon: ShieldAlert, color: '#F44336' },
  { title: 'Government Scheme', description: 'Find new opportunities', icon: Landmark, color: '#9C27B0' },
  { title: 'Crop Advisory', description: 'Expert farming tips', icon: Wheat, color: '#FFC107' },
];

export function DailyInfoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {infoItems.map((item, index) => (
        <InfoCard key={index} {...item} />
      ))}
    </div>
  );
}