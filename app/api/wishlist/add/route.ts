import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await req.json();

  // Get user's wishlist
  let { data: wishlist, error: wishlistError } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (wishlistError && wishlistError.code !== 'PGRST116') {
    console.error('Error fetching wishlist:', wishlistError);
    return NextResponse.json({ error: 'Could not fetch wishlist' }, { status: 500 });
  }

  if (!wishlist) {
    // Create wishlist if it doesn't exist
    const { data: newWishlist, error: newWishlistError } = await supabase
      .from('wishlists')
      .insert({ user_id: user.id })
      .select('id')
      .single();

    if (newWishlistError || !newWishlist) {
      console.error('Error creating wishlist:', newWishlistError);
      return NextResponse.json({ error: 'Could not create wishlist' }, { status: 500 });
    }
    wishlist = newWishlist;
  }

  // Add item to wishlist
  const { error: itemError } = await supabase.from('wishlist_items').insert({
    wishlist_id: wishlist.id,
    product_id: productId,
  });

  if (itemError) {
    console.error('Error adding item to wishlist:', itemError);
    return NextResponse.json({ error: 'Could not add item to wishlist' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Item added to wishlist' }, { status: 200 });
}
