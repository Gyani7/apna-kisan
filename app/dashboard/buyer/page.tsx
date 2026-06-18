
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function BuyerDashboardPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Buyer Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome to your dashboard.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
