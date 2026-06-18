
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function DiseasePredictionPage() {
  return (
    <Shell>
      <PageHeader
        title="AI Disease Prediction"
        description="Predict disease outbreaks, receive pest alerts, and access crop-specific disease models."
      />
      <div className="grid gap-8">
        <p className="text-center">AI Disease Prediction features coming soon.</p>
      </div>
    </Shell>
  );
}
