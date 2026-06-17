import { getUserRole } from '@/lib/user.server';
import { redirect } from 'next/navigation';

export default async function BuyerDashboard() {
  const role = await getUserRole();

  if (role !== 'buyer') {
    redirect('/');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
      <p>Welcome, buyer! This is your dedicated space to find products and connect with farmers.</p>
    </div>
  );
}
