import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug } from "lucide-react";

export function PestControl() {
  // Mock data - replace with API data
  const pestAlerts = [
    {
      name: "Bollworm Alert",
      crop: "Cotton",
      severity: "High",
      suggestion: "Scout fields for larvae. Consider neem oil spray."
    },
    {
      name: "Brown Plant Hopper",
      crop: "Rice",
      severity: "Medium",
      suggestion: "Maintain proper water levels and avoid excessive nitrogen."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bug className="mr-2" />
          AI Pest & Disease Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pestAlerts.map(alert => (
          <div key={alert.name} className="border p-3 rounded-lg">
            <h4 className="font-semibold">{alert.name} for {alert.crop}</h4>
            <p><span className="font-bold">Severity:</span> {alert.severity}</p>
            <p><span className="font-bold">Suggestion:</span> {alert.suggestion}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
