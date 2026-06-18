
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function MandiPage({ params }: { params: { mandi: string } }) {
  const mandiName = toTitleCase(params.mandi.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader
        title={`${mandiName} Mandi Prices`}
        description={`Daily and historical mandi prices for ${mandiName}, including crop demand forecasts.`}
      />
      <div className="grid gap-8">
        {/* Add mandi-specific content here */}
      </div>
    </Shell>
  );
}
