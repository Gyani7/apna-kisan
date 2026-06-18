
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminCommunityPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Community</PageHeaderHeading>
        <PageHeaderDescription>
          Manage community.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
