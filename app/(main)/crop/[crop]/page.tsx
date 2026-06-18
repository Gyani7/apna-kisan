
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function CropPage({ params }: { params: { crop: string } }) {
  const cropName = toTitleCase(params.crop.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${cropName} Farming Guide`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`A comprehensive guide to growing ${cropName}, including soil preparation, irrigation, and pest management.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add crop-specific content here */}
      </div>
    </Shell>
  );
}
