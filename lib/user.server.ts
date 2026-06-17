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
    // The build fails here due to a type inference issue where `role` becomes `never`.
    // The original logic assumes `role` can be an object or an array.
    // Casting `role` here clarifies the intent for the type checker.
    return (role as { name: string }).name || null;
  }
}
