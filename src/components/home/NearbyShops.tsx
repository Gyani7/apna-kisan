import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NearbyShops() {
  // Mock data
  const shops = [
    { name: "Sharma Khad Bhandar", category: "Fertilizers" },
    { name: "Gupta Seeds", category: "Seeds" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nearby Agriculture Shops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shops.map((shop) => (
            <Card key={shop.name}>
              <CardHeader>
                <CardTitle>{shop.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{shop.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
