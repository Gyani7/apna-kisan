'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VillageAnalyticsProps {
  villageId?: string;
}

export function VillageAnalytics({ villageId }: VillageAnalyticsProps) {
  // Mock data for a single village
  const villageData = {
    name: 'Anandpur',
    totalFarmers: 150,
    cultivatedLand: '500 acres',
    majorCrops: ['Wheat', 'Rice', 'Sugarcane'],
    irrigationCoverage: '80%',
    averageYield: '4.5 tons/acre',
    soilHealthScore: '7.8/10',
    rainfallHistory: '750mm (annual avg)',
    waterResourceAvailability: 'Good',
    cropDistribution: {
      wheat: '40%',
      rice: '30%',
      sugarcane: '20%',
      other: '10%',
    },
    productivityRanking: '3rd in district',
  };

  return (
    <Card className="bg-gray-800/50 text-white backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{villageData.name} - Village Intelligence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Total Farmers:</strong> {villageData.totalFarmers}</p>
            <p><strong>Cultivated Land:</strong> {villageData.cultivatedLand}</p>
            <p><strong>Irrigation Coverage:</strong> {villageData.irrigationCoverage}</p>
            <p><strong>Soil Health Score:</strong> {villageData.soilHealthScore}</p>
          </div>
          <div>
            <p><strong>Average Yield:</strong> {villageData.averageYield}</p>
            <p><strong>Rainfall History:</strong> {villageData.rainfallHistory}</p>
            <p><strong>Water Availability:</strong> {villageData.waterResourceAvailability}</p>
            <p><strong>Productivity Ranking:</strong> {villageData.productivityRanking}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Major Crops:</h4>
          <p>{villageData.majorCrops.join(', ')}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Crop Distribution:</h4>
          <div className="flex items-center space-x-4 mt-2">
            {Object.entries(villageData.cropDistribution).map(([crop, percentage]) => (
              <div key={crop} className="text-center">
                <p className="font-bold">{percentage}</p>
                <p className="text-xs">{crop.charAt(0).toUpperCase() + crop.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}