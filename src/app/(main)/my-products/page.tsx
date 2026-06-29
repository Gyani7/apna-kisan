
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Product, UserRole } from "@/lib/types";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from 'lucide-react';

async function MyProductsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (profile?.role !== UserRole.FARMER) {
    redirect("/");
  }

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('farmer_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    // Handle error state, maybe show a toast or an error message
  }

  return (
    <Shell>
      <PageHeader>
        <div className="flex justify-between items-center">
          <div>
            <PageHeaderHeading>My Products</PageHeaderHeading>
            <PageHeaderDescription>Manage your listed products.</PageHeaderDescription>
          </div>
          <Link href="/my-products/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
        </div>
      </PageHeader>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-lg text-muted-foreground">You haven't listed any products yet.</p>
        </div>
      )}
    </Shell>
  );
}

export default MyProductsPage;
