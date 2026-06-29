'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function removeItem(cartItemId: string) {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: 'Not authenticated' };
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error removing item from cart:', error);
    return { success: false, message: 'Failed to remove item.' };
  }

  revalidatePath('/cart');
  return { success: true, message: 'Item removed.' };
}
