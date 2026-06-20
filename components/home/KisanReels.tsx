import { Card, CardContent } from "@/components/ui/card";

export function KisanReels() {
  // Mock data
  const reels = [
    { id: 1, title: "Farming Tips for Beginners", user: "Expert1" },
    { id: 2, title: "Crop Management 101", user: "AgriPro" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Kisan Reels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <Card key={reel.id}>
              <CardContent className="p-4">
                <div className="aspect-w-9 aspect-h-16 bg-gray-200"></div>
                <p className="font-bold mt-2">{reel.title}</p>
                <p className="text-sm text-gray-500">@{reel.user}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
