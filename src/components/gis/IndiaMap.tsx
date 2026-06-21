import { Button } from "@/components/ui/button";

export function IndiaMap() {
  // TODO: Replace with Mappls GL JS
  return (
    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-bold mb-4">[Interactive Map of India]</p>
        <p className="text-muted-foreground mb-6">Powered by Mappls</p>
        <div className="space-x-2">
          <Button variant="outline">Satellite</Button>
          <Button variant="outline">Terrain</Button>
          <Button variant="outline">Agriculture</Button>
        </div>
      </div>
    </div>
  );
}