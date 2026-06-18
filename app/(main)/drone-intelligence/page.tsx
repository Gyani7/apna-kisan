
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function DroneIntelligencePage() {
  return (
    <Shell>
      <PageHeader
        title="Drone Intelligence Center"
        description="Manage drone spraying, surveys, crop health scanning, disease hotspots, and more."
      />
      <div className="grid gap-8">
        <p className="text-center">Drone Intelligence features coming soon.</p>
      </div>
    </Shell>
  );
}
