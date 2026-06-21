import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrendingTopics() {
  // Mock data
  const topics = [
    { title: "#WheatFarming", posts: 1200 },
    { title: "#OrganicFertilizers", posts: 800 },
    { title: "#PestControl", posts: 500 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {topics.map((topic) => (
          <div key={topic.title}>
            <p className="font-bold">{topic.title}</p>
            <p className="text-sm text-gray-500">{topic.posts} posts</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
