import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function FarmerProductsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('farmer_id', user?.id);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Button asChild>
          <Link href="/dashboard/farmer/products/new">Add Product</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-lg font-bold mt-2">₹{product.price}/{product.unit}</p>
            <p className="mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
