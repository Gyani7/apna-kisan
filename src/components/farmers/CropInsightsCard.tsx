import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Droplet, Bug, Zap } from "lucide-react";

const InsightIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Bug className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Zap className="w-5 h-5 text-green-500" />;
      default:
        return <Droplet className="w-5 h-5 text-blue-500" />;
    }
};


export function CropInsightsCard() {
  // Placeholder data
  const insights = [
    {
      title: 'Irrigation Alert',
      message: 'Your tomato field soil moisture is low.',
      type: 'alert',
      action: 'Irrigate Now'
    },
    {
      title: 'Pest Warning',
      message: 'Aphids detected in your potato crop.',
      type: 'warning',
      action: 'View Treatment'
    },
    {
      title: 'High Yield',
      message: 'Onion crop is on track for a high yield!',
      type: 'info',
      action: 'See Details'
    },
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actionable Crop Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-3 rounded-lg border-l-4 ${getInsightColor(insight.type)} flex items-center justify-between`}>
            <div className="flex items-center">
                <InsightIcon type={insight.type} />
                <div className="ml-3">
                    <p className="font-bold text-sm">{insight.title}</p>
                    <p className="text-xs">{insight.message}</p>
                </div>
            </div>
            <Button variant="outline" size="sm">{insight.action}</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
