import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { ProductCard } from "@/components/ProductCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Product } from "@/lib/types";

export default async function MarketPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products } = await supabase.from("products").select("*");

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Marketplace</PageHeaderHeading>
        <PageHeaderDescription>
          Buy and sell fresh produce and other agricultural products.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(products as any[])?.map((product) => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
    </Shell>
  );
}
