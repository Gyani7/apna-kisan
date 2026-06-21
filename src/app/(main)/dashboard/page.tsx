import { getDashboardData } from "@/lib/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Local Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Temperature:</strong> {data.weather.temperature}°C</p>
            <p><strong>Humidity:</strong> {data.weather.humidity}%</p>
            <p><strong>Forecast:</strong> {data.weather.forecast}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nearby Market Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {data.marketPrices.map((item) => (
                <li key={item.crop}><strong>{item.crop}:</strong> ₹{item.price} / quintal</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {data.myCrops.map((crop) => (
                <li key={crop.name}>
                  <strong>{crop.name}:</strong> {crop.stage} (Health: {crop.health}%)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
