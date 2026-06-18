
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function SchemePage({ params }: { params: { scheme: string } }) {
  const schemeName = toTitleCase(params.scheme.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader
        title={`${schemeName}`}
        description={`Information about the ${schemeName} government scheme for farmers.`}
      />
      <div className="grid gap-8">
        {/* Add scheme-specific content here */}
      </div>
    </Shell>
  );
}
