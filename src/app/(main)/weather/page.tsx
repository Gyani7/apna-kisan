import { getWeatherData } from "@/lib/supabase/app-features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/lib/weather";

export default async function WeatherPage() {
  const weather: WeatherData = await getWeatherData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Weather Forecast</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Temperature:</strong> {weather.current.temperature}°C</p>
            <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
            <p><strong>Wind:</strong> {weather.current.wind_speed} km/h</p>
            <p><strong>Precipitation:</strong> {weather.current.precipitation} mm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {weather.hourly.map((hour) => (
                <li key={hour.time}>
                  <strong>{hour.time}:</strong> {hour.temperature}°C, {hour.condition}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {weather.daily.map((day) => (
                <li key={day.date}>
                  <strong>{day.date}:</strong> {day.max_temp}°C / {day.min_temp}°C, {day.condition}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
