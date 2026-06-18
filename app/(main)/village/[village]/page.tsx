
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function VillagePage({ params }: { params: { village: string } }) {
  const villageName = toTitleCase(params.village.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${villageName} Agriculture`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`Agricultural insights for ${villageName}, including farmer statistics, soil data, and more.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add village-specific content here */}
      </div>
    </Shell>
  );
}
