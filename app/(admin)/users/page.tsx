
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminUsersPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Users</PageHeaderHeading>
        <PageHeaderDescription>
          Manage users.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
