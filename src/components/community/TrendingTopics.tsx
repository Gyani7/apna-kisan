
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, TrendingUp } from 'lucide-react';

export function TrendingTopics() {
  // Mock data with more detail
  const topics = [
    { title: "#OrganicRevolution", posts: 1450 },
    { title: "#PrecisionFarming", posts: 1120 },
    { title: "#WaterConservation", posts: 980 },
    { title: "#SolarPumps", posts: 750 },
    { title: "#CommunityHarvest", posts: 600 },
  ];

  return (
    <Card className="card-glass bg-premium-green-dark/60 border-premium-gold/30 text-premium-white">
      <CardHeader>
        <CardTitle className="flex items-center text-premium-gold">
            <Flame className="mr-2"/>
            Trending on Krishi+
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic, index) => (
          <div key={topic.title} className="flex justify-between items-center hover:bg-premium-green-dark/50 p-2 rounded-md">
            <div>
                <p className="font-bold text-lg">{topic.title}</p>
                <p className="text-sm text-premium-white/60">{topic.posts.toLocaleString()} posts</p>
            </div>
            <TrendingUp className="text-premium-gold/80" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
