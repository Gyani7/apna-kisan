import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SoilHealthCard } from "./SoilHealthCard";

export function SoilIntelligence() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Intelligence Center</CardTitle>
      </CardHeader>
      <CardContent>
        <SoilHealthCard />
      </CardContent>
    </Card>
  );
}
