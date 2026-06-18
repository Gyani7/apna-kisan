
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function StatePage({ params }: { params: { state: string } }) {
  const stateName = toTitleCase(params.state.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${stateName} Agriculture`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`Agricultural insights for ${stateName}, including crops, weather, and government schemes.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add state-specific content here */}
      </div>
    </Shell>
  );
}
