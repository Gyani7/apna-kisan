import { notFound } from "next/navigation";
import { getVillageBySlug } from "@/lib/village";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function VillagePage({ params }: { params: { slug: string } }) {
  const village = await getVillageBySlug(params.slug);

  if (!village) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{village.name}</h1>
        <div className="text-lg text-gray-500">Crop Health Score: {village.cropHealthScore}%</div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Village Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Farmers Count:</strong> {village.farmersCount}</p>
            <p><strong>Crop Distribution:</strong> {village.cropDistribution.join(", ")}</p>
            <p><strong>Soil Data:</strong> {village.soilData}</p>
            <p><strong>Rainfall Data:</strong> {village.rainfallData}</p>
            <p><strong>Water Sources:</strong> {village.waterSources.join(", ")}</p>
            <p><strong>Govt Schemes Usage:</strong> {village.govtSchemesUsage}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {village.topFarmers.map((farmer) => (
                <li key={farmer.id} className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={farmer.avatar} />
                    <AvatarFallback>{farmer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{farmer.name}</p>
                    <p className="text-sm text-gray-500">{farmer.reputation} Reputation</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Kisan Mitra</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {village.topKisanMitra.map((mitra) => (
                <li key={mitra.id} className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={mitra.avatar} />
                    <AvatarFallback>{mitra.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{mitra.name}</p>
                    <p className="text-sm text-gray-500">{mitra.reputation} Reputation</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
