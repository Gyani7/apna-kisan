'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const insights = {
  weather: {
    temp: '32°C',
    condition: 'Sunny',
    humidity: '65%',
  },
  cropStatus: {
    name: 'Wheat',
    stage: 'Flowering',
    health: 'Good',
  },
  marketPrice: {
    name: 'Wheat',
    price: '₹2,200/quintal',
    change: '+2.5%',
  },
  alerts: [
    'Heatwave expected in the next 3 days. Irrigate your fields.',
    'Mandi prices for soybeans are up by 3%. Consider selling.',
  ],
};

export function RealTimeInsights() {
  return (
    <Card className="bg-gray-800/50 text-white backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Real-Time Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="font-semibold">Weather</p>
            <p>{insights.weather.temp}, {insights.weather.condition}</p>
            <p>Humidity: {insights.weather.humidity}</p>
          </div>
          <div>
            <p className="font-semibold">Crop Status (Wheat)</p>
            <p>Stage: {insights.cropStatus.stage}</p>
            <p>Health: {insights.cropStatus.health}</p>
          </div>
          <div>
            <p className="font-semibold">Market Price (Wheat)</p>
            <p>{insights.marketPrice.price} <span className="text-green-400">({insights.marketPrice.change})</span></p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">AI-Powered Alerts</h4>
          <ul className="list-disc list-inside text-xs space-y-1 mt-2">
            {insights.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
