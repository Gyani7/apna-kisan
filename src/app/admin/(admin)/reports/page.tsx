
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminReportsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Reports</PageHeaderHeading>
        <PageHeaderDescription>
          View reports.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
