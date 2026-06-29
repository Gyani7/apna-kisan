
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Shell } from "@/components/shell";
import { PageHeader, PageHeaderHeading } from "@/components/PageHeader";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { removeItemFromWishlist } from "./actions";
import { Button } from "@/components/ui/button";

export default async function WishlistPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    notFound();
  }

  const { data: wishlistItems, error } = await supabase
    .from("wishlist_items")
    .select(`
      id,
      products (*)
    `)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error fetching wishlist items:", error);
    // Handle error appropriately
  }

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Wishlist</PageHeaderHeading>
      </PageHeader>
      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              {item.products && <ProductCard product={item.products[0]} />}
              <form action={async () => { 
                'use server';
                await removeItemFromWishlist(item.id);
              }} className="absolute top-2 right-2">
                <Button variant="destructive" size="icon">X</Button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </Shell>
  );
}
