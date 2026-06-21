
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminSettingsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage settings.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
