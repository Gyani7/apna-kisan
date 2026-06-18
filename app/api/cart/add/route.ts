import { createServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  // Get user's cart
  let { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (cartError && cartError.code !== 'PGRST116') {
    console.error('Error fetching cart:', cartError);
    return NextResponse.json({ error: 'Could not fetch cart' }, { status: 500 });
  }

  if (!cart) {
    // Create cart if it doesn't exist
    const { data: newCart, error: newCartError } = await supabase
      .from('carts')
      .insert({ user_id: user.id })
      .select('id')
      .single();

    if (newCartError || !newCart) {
      console.error('Error creating cart:', newCartError);
      return NextResponse.json({ error: 'Could not create cart' }, { status: 500 });
    }
    cart = newCart;
  }

  // Add item to cart
  const { error: itemError } = await supabase.from('cart_items').insert({
    cart_id: cart.id,
    product_id: productId,
    quantity,
  });

  if (itemError) {
    console.error('Error adding item to cart:', itemError);
    return NextResponse.json({ error: 'Could not add item to cart' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Item added to cart' }, { status: 200 });
}
