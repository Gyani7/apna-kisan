
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function SchemesPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Schemes</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest government schemes.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
