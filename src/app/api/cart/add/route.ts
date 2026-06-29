
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/user';

export async function POST(req: NextRequest) {
  const { productId, quantity } = await req.json();
  const user = await getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('cart_items')
    .insert([{ user_id: user.id, product_id: productId, quantity }])
    .select();

  if (error) {
    console.error('Error adding to cart:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to add to cart' }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
}
