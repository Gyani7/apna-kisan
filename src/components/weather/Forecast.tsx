import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Forecast() {
  // Mock data
  const forecast = [
    { day: "Mon", temp: 33, icon: "/placeholder.svg?text=☀️" },
    { day: "Tue", temp: 34, icon: "/placeholder.svg?text=☀️" },
    { day: "Wed", temp: 32, icon: "/placeholder.svg?text=☁️" },
    { day: "Thu", temp: 31, icon: "/placeholder.svg?text=🌧️" },
    { day: "Fri", temp: 30, icon: "/placeholder.svg?text=🌧️" },
    { day: "Sat", temp: 32, icon: "/placeholder.svg?text=☁️" },
    { day: "Sun", temp: 33, icon: "/placeholder.svg?text=☀️" },
  ];

  return (
    <Card>
        <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
      <CardContent className="grid grid-cols-7 gap-2">
        {forecast.map((day) => (
          <div key={day.day} className="text-center">
            <p className="font-bold">{day.day}</p>
            <img src={day.icon} alt="weather icon" className="w-10 h-10 mx-auto" />
            <p>{day.temp}°C</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
