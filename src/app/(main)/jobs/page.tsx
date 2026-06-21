
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function JobsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Jobs</PageHeaderHeading>
        <PageHeaderDescription>
          Find the latest jobs in agriculture.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
