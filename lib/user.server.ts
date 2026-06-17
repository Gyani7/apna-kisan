import { createServerClient } from '@/lib/supabase/server';

export async function getUserRole() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('role:roles(name)')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  // The type from Supabase indicates that `role` is an array.
  return (data?.role as any)?.[0]?.name || null;
}
