import { WeatherCard } from '@/components/farmers/WeatherCard';
import { MandiRatesCard } from '@/components/farmers/MandiRatesCard';
import { CropInsightsCard } from '@/components/farmers/CropInsightsCard';

export default function FarmerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WeatherCard />
      <MandiRatesCard />
      <CropInsightsCard />
    </div>
  );
}
