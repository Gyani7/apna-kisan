import { createServerClient } from '@/lib/supabase/server';

export async function getUserRole() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return data?.role;
}
