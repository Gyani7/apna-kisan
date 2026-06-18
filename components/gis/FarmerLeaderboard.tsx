'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const topFarmers = [
  {
    name: 'Rajesh Kumar',
    yield: '5.2 tons/acre',
    profit: '₹1,20,000',
    waterEfficiency: '95%',
    organicFarming: '80%',
    techAdoption: '90%',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Sita Devi',
    yield: '5.0 tons/acre',
    profit: '₹1,15,000',
    waterEfficiency: '92%',
    organicFarming: '85%',
    techAdoption: '88%',
    avatar: '/avatars/02.png',
  },
  // Add more mock data here...
];

export function FarmerLeaderboard() {
  return (
    <Card className="bg-gray-800/50 text-white backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle>Top Farmer Leaderboard - Anandpur</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topFarmers.map((farmer, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-700/50">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={farmer.avatar} />
                  <AvatarFallback>{farmer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{farmer.name}</p>
                  <p className="text-xs">Yield: {farmer.yield} | Profit: {farmer.profit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">#{index + 1}</p>
                {/* Add achievement badges here */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
