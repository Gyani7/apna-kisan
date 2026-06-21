import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveWeather() {
  // Mock data - replace with API data
  const weather = {
    current: "28°C",
    rain: "10%",
    wind: "15 km/h",
    humidity: "60%",
    forecast: [
      { day: "Mon", temp: "29°C" },
      { day: "Tue", temp: "30°C" },
      { day: "Wed", temp: "31°C" },
      { day: "Thu", temp: "30°C" },
      { day: "Fri", temp: "29°C" },
      { day: "Sat", temp: "28°C" },
      { day: "Sun", temp: "29°C" },
    ],
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Live Weather</h2>
        <Card>
          <CardHeader>
            <CardTitle>Today's Weather</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>Current: {weather.current}</div>
            <div>Rain: {weather.rain}</div>
            <div>Wind: {weather.wind}</div>
            <div>Humidity: {weather.humidity}</div>
          </CardContent>
          <CardContent>
            <h3 className="font-bold mb-4">7 Day Forecast</h3>
            <div className="flex justify-between">
              {weather.forecast.map((day) => (
                <div key={day.day} className="text-center">
                  <div>{day.day}</div>
                  <div>{day.temp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
