import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { MainNav } from '@/components/MainNav';
import { UserNav } from '@/components/common/UserNav';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex h-16 items-center justify-between px-4 border-b">
        <MainNav />
        <UserNav />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
