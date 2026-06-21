
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function MachineryPage({ params }: { params: { machinery: string } }) {
  const machineryName = toTitleCase(params.machinery.replace(/-/g, " "));

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>{`${machineryName} Guide`}</PageHeaderHeading>
        <PageHeaderDescription>
          {`A comprehensive guide to the ${machineryName}, including its uses, maintenance, and where to buy.`}
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8">
        {/* Add machinery-specific content here */}
      </div>
    </Shell>
  );
}
