
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function MyProductsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>My Products</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage your products.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
