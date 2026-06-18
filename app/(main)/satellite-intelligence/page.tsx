
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function SatelliteIntelligencePage() {
  return (
    <Shell>
      <PageHeader
        title="Satellite Intelligence Platform"
        description="Monitor NDVI, crop health, water stress, drought, floods, and more with satellite data."
      />
      <div className="grid gap-8">
        <p className="text-center">Satellite Intelligence features coming soon.</p>
      </div>
    </Shell>
  );
}
