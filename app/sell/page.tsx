
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function SellPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Sell a Product</PageHeaderHeading>
        <PageHeaderDescription>
          Sell a new product on the marketplace.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
