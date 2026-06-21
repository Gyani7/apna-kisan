import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CropRotation } from "./CropRotation";
import { PestControl } from "./PestControl";

interface CropIntelligenceProps {
  villageId?: string;
}

export function CropIntelligence({ villageId }: CropIntelligenceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Intelligence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CropRotation />
        <PestControl />
      </CardContent>
    </Card>
  );
}