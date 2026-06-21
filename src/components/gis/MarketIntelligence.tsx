'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

const marketData = {
  localMandi: {
    name: 'Anandpur Mandi',
    prices: [
      { crop: 'Wheat', price: '₹2,250/q', trend: 'up' },
      { crop: 'Rice', price: '₹3,400/q', trend: 'down' },
      { crop: 'Sugarcane', price: '₹380/q', trend: 'up' },
    ],
  },
  nationalMandi: {
    name: 'National Average',
    prices: [
      { crop: 'Wheat', price: '₹2,310/q', trend: 'up' },
      { crop: 'Rice', price: '₹3,350/q', trend: 'down' },
    ],
  },
  demandForecast: [
    { crop: 'Onions', forecast: 'High demand expected next month due to festive season.', action: 'Consider planting onions.' },
    { crop: 'Tomatoes', forecast: 'Prices may fall due to oversupply from neighboring regions.', action: 'Sell your stock soon.' },
  ],
  exportOpportunities: [
    { crop: 'Basmati Rice', country: 'UAE', details: 'High demand for premium quality Basmati.' },
    { crop: 'Organic Turmeric', country: 'USA', details: 'Growing market for organic spices.' },
  ],
};

const TrendIcon = ({ trend }: { trend: string }) => 
  trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;

export function MarketIntelligence({ district }: { district?: string }) {
  return (
    <Card className="bg-gray-800/50 text-white backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Market Intelligence {district ? `- ${district}` : ''}</CardTitle>
      </CardHeader>
      <CardContent>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">{marketData.localMandi.name}</h4>
            <div className="space-y-2 text-sm">
              {marketData.localMandi.prices.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <p>{item.crop}</p>
                  <div className="flex items-center space-x-2">
                    <p>{item.price}</p>
                    <TrendIcon trend={item.trend} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{marketData.nationalMandi.name}</h4>
            <div className="space-y-2 text-sm">
              {marketData.nationalMandi.prices.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <p>{item.crop}</p>
                  <div className="flex items-center space-x-2">
                    <p>{item.price}</p>
                    <TrendIcon trend={item.trend} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">AI-Powered Demand Forecast</h4>
          <div className="space-y-2 text-xs">
            {marketData.demandForecast.map((item, i) => (
              <div key={i} className="p-2 bg-gray-700/50 rounded-lg">
                <p className="font-bold text-blue-300">{item.crop}: {item.action}</p>
                <p>{item.forecast}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Export Opportunities</h4>
           <div className="space-y-2 text-xs">
            {marketData.exportOpportunities.map((item, i) => (
              <div key={i} className="flex items-start space-x-2">
                <Info className="w-4 h-4 mt-1 text-cyan-400" />
                <p><strong>{item.crop} to {item.country}:</strong> {item.details}</p>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}