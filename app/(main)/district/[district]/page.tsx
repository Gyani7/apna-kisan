
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function DistrictPage({ params }: { params: { district: string } }) {
  const districtName = toTitleCase(params.district.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${districtName} Agriculture`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`Agricultural insights for ${districtName}, including crops, weather, and government schemes.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add district-specific content here */}
      </div>
    </Shell>
  );
}
