
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const { productId, quantity } = await req.json();
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { data, error } = await supabase.functions.invoke('add-to-cart', {
    body: { userId: user.id, productId, quantity },
  });

  if (error) {
    console.error('Error adding to cart:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to add to cart' }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
}
