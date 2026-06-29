
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
          <img src={product.image_urls?.[0] || '/placeholder.svg'} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <PageHeader>
            <PageHeaderHeading>{product.title}</PageHeaderHeading>
          </PageHeader>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₹{product.price}</p>
          <div className="flex gap-4">
            <AddToCartButton productId={product.id} />
            <AddToWishlistButton productId={product.id} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
