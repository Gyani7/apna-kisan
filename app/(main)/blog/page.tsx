
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function BlogPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <PageHeaderDescription>
          Read our latest blog posts.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
