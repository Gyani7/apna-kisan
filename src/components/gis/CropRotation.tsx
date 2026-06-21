import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export function CropRotation() {
  // Mock data - replace with API data
  const rotationSuggestions = [
    "After harvesting Wheat, plant a legume like Mungbean to fix nitrogen.",
    "Rotate rice with a dry-foot crop like Mustard to break pest cycles.",
    "Consider a 3-year rotation: Sugarcane -> Ratoon -> Green Manure (e.g., Dhaincha).",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2" />
          AI Crop Rotation Advisor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc list-inside">
          {rotationSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
