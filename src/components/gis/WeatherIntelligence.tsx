import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherCard } from "@/components/farmers/WeatherCard";

export function WeatherIntelligence({ location }: { location?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Intelligence Center</CardTitle>
      </CardHeader>
      <CardContent>
        <WeatherCard />
      </CardContent>
    </Card>
  );
}