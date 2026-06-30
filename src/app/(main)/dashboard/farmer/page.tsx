import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { FarmerDashboard } from '@/components/dashboard/FarmerDashboard';
import { UserRole } from '@/lib/types';

export default async function FarmerDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, farm_data')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== UserRole.Farmer) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You must be a farmer to view this page.</p>
      </div>
    );
  }

  return <FarmerDashboard farmData={profile.farm_data} />;
}
