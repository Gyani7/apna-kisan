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

  if (!data || !data.role) {
    return null;
  }

  const role = data.role;

  if (Array.isArray(role)) {
    return role[0]?.name || null;
  } else {
    return role.name || null;
  }
}
