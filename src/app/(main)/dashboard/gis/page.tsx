import { GISDashboard } from '@/components/gis/GISDashboard';
import { SoilIntelligence } from '@/components/gis/SoilIntelligence';
import { WeatherIntelligence } from '@/components/gis/WeatherIntelligence';
import { CropIntelligence } from '@/components/gis/CropIntelligence';
import { Marketplace } from '@/components/gis/Marketplace';
import { Shell } from '@/components/shell';

export default function GISDashboardPage() {
  return (
    <Shell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GISDashboard />
        </div>
        <div className="space-y-8">
          <SoilIntelligence />
          <WeatherIntelligence />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <CropIntelligence />
            <Marketplace />
        </div>
      </div>
    </Shell>
  );
}
