import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VillageExplorer() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Village Explorer</h2>
        <div className="flex justify-center mb-8">
          <Input placeholder="Search Village" className="max-w-md" />
          <Button className="ml-4">Search</Button>
        </div>
        {/* Interactive map would go here */}
      </div>
    </section>
  );
}
