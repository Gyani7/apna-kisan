import { createServerClient } from '@/utils/supabase/server';
import { MessageFarmerButton } from '@/components/MessageFarmerButton';

export default async function ProductsPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: products, error } = await supabase
    .from('products')
    .select('*, profiles (username)')
    .order('created_at', { ascending: false });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">Listed by @{product.profiles?.username ?? 'farmer'}</p>
            <p className="text-lg font-bold mt-2">₹{product.price}/{product.unit}</p>
            <p className="mt-2 flex-grow">{product.description}</p>
            {user && user.id !== product.farmer_id && (
              <div className="mt-4">
                <MessageFarmerButton farmerId={product.farmer_id!} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
