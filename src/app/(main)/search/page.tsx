
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function SearchPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Search</PageHeaderHeading>
        <PageHeaderDescription>Search for anything in the app.</PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
