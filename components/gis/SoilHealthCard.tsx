import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export function SoilHealthCard() {
  // Mock data - replace with API data
  const soilData = {
    ph: 6.8,
    organicCarbon: "1.2%",
    nitrogen: "280 kg/ha",
    phosphorus: "25 kg/ha",
    potassium: "150 kg/ha",
    suitability: [
      { crop: "Wheat", suitability: "High" },
      { crop: "Rice", suitability: "Medium" },
      { crop: "Sugarcane", suitability: "High" },
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Health Card</CardTitle>
        <CardDescription>Last updated: 2 days ago</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>pH Level:</strong> {soilData.ph}</p>
          <p><strong>Organic Carbon:</strong> {soilData.organicCarbon}</p>
          <p><strong>Nitrogen (N):</strong> {soilData.nitrogen}</p>
          <p><strong>Phosphorus (P):</strong> {soilData.phosphorus}</p>
          <p><strong>Potassium (K):</strong> {soilData.potassium}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">AI Crop Suitability</h4>
          <div className="space-y-2">
            {soilData.suitability.map(item => (
              <div key={item.crop} className="flex justify-between items-center">
                <span>{item.crop}</span>
                <Badge variant={item.suitability === "High" ? "default" : "secondary"}>
                  {item.suitability}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
