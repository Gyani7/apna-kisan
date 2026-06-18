
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminDashboardPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Admin Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome to the admin dashboard.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
