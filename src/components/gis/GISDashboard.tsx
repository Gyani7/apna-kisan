
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndiaMap } from "./IndiaMap"; // Assuming you have a map component

export function GISDashboard() {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Smart India Agriculture Map</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px] relative">
        <IndiaMap />
      </CardContent>
    </Card>
  );
}
