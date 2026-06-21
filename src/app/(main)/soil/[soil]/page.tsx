
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function SoilPage({ params }: { params: { soil: string } }) {
  const soilName = toTitleCase(params.soil.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${soilName} Guide`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`A comprehensive guide to ${soilName}, including its properties and suitable crops.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add soil-specific content here */}
      </div>
    </Shell>
  );
}
