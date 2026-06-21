import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CurrentWeather() {
    // Mock data
    const weather = {
        location: "Delhi",
        temp: 32,
        description: "Sunny",
        icon: "/placeholder.svg?text=☀️"
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Current Weather in {weather.location}</CardTitle>
        </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <img src={weather.icon} alt={weather.description} className="w-20 h-20" />
        <div>
          <p className="text-5xl font-bold">{weather.temp}°C</p>
          <p>{weather.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
