import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { UserRole } from '@/lib/types';
import { ChatList } from '@/components/ChatList';

export default async function ChatsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: conversations } = await supabase
    .from('conversations')
    .select('*, user1:profiles!user1_id(*), user2:profiles!user2_id(*)')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return redirect('/login');
  }

  const canStartConversation = [
    UserRole.Farmer,
    UserRole.Expert,
    UserRole.Buyer
  ].includes(profile.role);

  return (
    <ChatList
      conversations={conversations || []}
      currentUser={{ id: user.id, role: profile.role }}
      canStartConversation={canStartConversation}
    />
  );
}
