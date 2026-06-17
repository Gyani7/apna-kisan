'use client';

import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
