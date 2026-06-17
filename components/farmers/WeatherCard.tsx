import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WeatherCard() {
  // Placeholder data
  const weather = {
    city: 'Pune',
    temperature: '28°C',
    condition: 'Sunny',
    humidity: '65%',
    wind: '10 km/h',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">{weather.temperature}</p>
            <p className="text-lg">{weather.city}</p>
          </div>
          <div className="text-right">
            <p>{weather.condition}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>Wind: {weather.wind}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
