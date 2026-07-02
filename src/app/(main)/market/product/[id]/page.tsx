
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Shell } from "@/components/shell";
import { PageHeader, PageHeaderHeading } from "@/components/PageHeader";
import { Product } from "@/lib/types";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { AddToWishlistButton } from "@/components/AddToWishlistButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={(product as any).image_urls?.[0] || '/placeholder.svg'} alt={(product as any).title} className="w-full rounded-lg" />
        </div>
        <div>
          <PageHeader>
            <PageHeaderHeading>{(product as any).title}</PageHeaderHeading>
          </PageHeader>
          <p className="text-lg text-gray-700 mb-4">{(product as any).description}</p>
          <p className="text-2xl font-bold mb-4">₹{(product as any).price}</p>
          <div className="flex gap-4">
            <AddToCartButton productId={(product as any).id} />
            <AddToWishlistButton productId={(product as any).id} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
