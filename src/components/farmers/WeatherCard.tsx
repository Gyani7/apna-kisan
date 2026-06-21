"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wind, Droplets, Thermometer, Sunrise, Sunset, Eye, Cloudy, CloudRain, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function WeatherCard() {
  // Placeholder data
  const weather = {
    city: "Pune",
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    wind: 10,
    uvIndex: "High",
    sunrise: "6:15 AM",
    sunset: "6:45 PM",
    forecast: [
      { day: "Mon", icon: <Cloudy />, high: 30, low: 22 },
      { day: "Tue", icon: <CloudRain />, high: 27, low: 21 },
      { day: "Wed", icon: <Sun />, high: 32, low: 24 },
      { day: "Thu", icon: <Cloudy />, high: 31, low: 23 },
      { day: "Fri", icon: <Zap />, high: 28, low: 22 },
      { day: "Sat", icon: <Sun />, high: 33, low: 25 },
      { day: "Sun", icon: <CloudRain />, high: 26, low: 21 },
    ],
    alert: "AI Alert: High probability of rain tomorrow afternoon. Plan irrigation accordingly.",
  };

  return (
    <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weather in {weather.city}</span>
          <Sun size={24} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between text-center">
          <div className="text-6xl font-bold">
            {weather.temperature}°C
          </div>
          <div className="text-lg">
            {weather.condition}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <Droplets className="mx-auto mb-1" />
            <p>{weather.humidity}% Humidity</p>
          </div>
          <div>
            <Wind className="mx-auto mb-1" />
            <p>{weather.wind} km/h Wind</p>
          </div>
          <div>
            <Eye className="mx-auto mb-1" />
            <p>{weather.uvIndex} UV Index</p>
          </div>
        </div>
        <Separator className="bg-white/20" />
        <div>
          <h4 className="font-semibold mb-2 text-center">7-Day Forecast</h4>
          <div className="flex justify-around">
            {weather.forecast.map(day => (
              <div key={day.day} className="text-center">
                <p className="font-bold">{day.day}</p>
                <div className="my-1">{day.icon}</div>
                <p className="text-xs">{day.high}° / {day.low}°</p>
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-white/20" />
         <div>
          <h4 className="font-semibold mb-2 flex items-center"><Zap className="mr-2"/> AI Weather Alert</h4>
          <p className="text-sm bg-yellow-300/80 text-black p-3 rounded-lg">{weather.alert}</p>
        </div>
      </CardContent>
    </Card>
  );
}
