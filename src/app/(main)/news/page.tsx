
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function NewsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>News</PageHeaderHeading>
        <PageHeaderDescription>
          Get the latest news and updates.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
