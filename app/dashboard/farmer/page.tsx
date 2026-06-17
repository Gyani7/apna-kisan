import { getUserRole } from '@/lib/user';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function FarmerDashboard() {
  const role = await getUserRole();

  if (role !== 'farmer') {
    redirect('/');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
      <p className="mb-4">Welcome, farmer! This is your dedicated space to manage your farm and products.</p>
      <Link
        href="/dashboard/farmer/products"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        My Products
      </Link>
    </div>
  );
}
