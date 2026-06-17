import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CropInsightsCard() {
  // Placeholder data
  const insights = [
    {
      title: 'Soil Moisture Alert',
      message: 'Your tomato field requires irrigation. Soil moisture is below the optimal level.',
      type: 'alert',
    },
    {
      title: 'Pest Detection',
      message: 'Aphids detected in your potato crop. Consider using neem oil spray.',
      type: 'warning',
    },
    {
      title: 'Yield Prediction',
      message: 'Your onion crop is on track for a high yield this season. Keep up the good work!',
      type: 'info',
    },
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'border-red-500';
      case 'warning':
        return 'border-yellow-500';
      case 'info':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 border-l-4 rounded-md ${getInsightColor(insight.type)}`}>
            <p className="font-bold">{insight.title}</p>
            <p>{insight.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
