
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function AdminProductsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Products</PageHeaderHeading>
        <PageHeaderDescription>
          Manage products.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
