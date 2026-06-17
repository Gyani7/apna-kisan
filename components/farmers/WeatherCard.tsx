'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wind, Droplets, Thermometer } from "lucide-react";

export function WeatherCard() {
  // Placeholder data
  const weather = {
    city: "Pune",
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    wind: 10,
  };

  return (
    <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weather in {weather.city}</span>
          <Sun size={24} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center text-6xl font-bold">
          <Thermometer className="mr-2" size={48} />
          {weather.temperature}°C
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-semibold">{weather.condition}</p>
            <p className="text-sm">Condition</p>
          </div>
          <div>
            <p className="font-semibold">{weather.humidity}%</p>
            <p className="text-sm">Humidity</p>
          </div>
          <div>
            <p className="font-semibold">{weather.wind} km/h</p>
            <p className="text-sm">Wind</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
