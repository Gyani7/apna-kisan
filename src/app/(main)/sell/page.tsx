import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SellProductForm } from '@/components/SellProductForm';
import { UserRole } from '@/lib/types';

export default async function SellPage() {
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

  if (!profile) {
    return redirect('/login');
  }

  const canSell = [
    UserRole.User,
    UserRole.ProUser
  ].includes(profile.role);

  if (!canSell) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Permission Denied</h1>
        <p>You do not have permission to sell products.</p>
      </div>
    );
  }

  const handleSellProduct = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const imageFile = formData.get('image') as File;

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      let imageUrl = null;
      if (imageFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(`${user.id}/${Date.now()}_${imageFile.name}`, imageFile);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          return;
        }
        imageUrl = uploadData.path;
      }

      const { data, error } = await supabase.from('products').insert([
        {
          name,
          description,
          price,
          image_url: imageUrl,
          farmer_id: user.id,
        },
      ]);

      if (error) {
        console.error('Error inserting product:', error);
      } else {
        redirect('/market');
      }
    }
  };

  return <SellProductForm onSubmit={handleSellProduct} />;
}
