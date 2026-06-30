import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { MyProducts } from '@/components/MyProducts';
import { UserRole } from '@/lib/types';

export default async function MyProductsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== UserRole.Farmer) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You must be a farmer to view this page.</p>
      </div>
    );
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('farmer_id', user.id);

  return <MyProducts products={products || []} />;
}
