'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function removeItemFromWishlist(wishlistItemId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: 'Not authenticated' };
  }

  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', wishlistItemId)
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error removing item from wishlist:', error);
    return { success: false, message: 'Failed to remove item.' };
  }

  revalidatePath('/wishlist');
  return { success: true, message: 'Item removed.' };
}
