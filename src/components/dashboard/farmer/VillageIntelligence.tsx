
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VillageIntelligence() {
  // Mock data - replace with API call
  const villageData = {
    name: "Anandpur",
    totalFarmers: 125,
    cultivatedLand: "850 Acres",
    irrigationCoverage: "70%",
    soilHealthScore: "B+",
    averageYield: "4.2 Ton/Acre",
    rainfallHistory: "750mm avg.",
    waterResourceAvailability: "Good",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{villageData.name} - Village Intelligence</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
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
        </div>
      </CardContent>
    </Card>
  );
}
