import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SuccessStories() {
  // Mock data
  const stories = [
    {
      name: "Ramesh Kumar",
      village: "Bijoliya",
      crop: "Wheat",
      growth: "50%",
    },
    {
      name: "Sunita Sharma",
      village: "Govindgarh",
      crop: "Maize",
      growth: "70%",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <Card key={story.name}>
              <CardHeader>
                <CardTitle>{story.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Village: {story.village}</p>
                <p>Crop: {story.crop}</p>
                <p>Income Growth: {story.growth}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
