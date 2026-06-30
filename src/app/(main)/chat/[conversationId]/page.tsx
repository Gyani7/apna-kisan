import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Chat } from '@/components/Chat';
import { UserRole } from '@/lib/types';

interface ChatPageProps {
  params: {
    conversationId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  const { data: conversation } = await supabase
    .from('conversations')
    .select('*, user1:profiles!user1_id(*), user2:profiles!user2_id(*)')
    .eq('id', params.conversationId)
    .single();

  if (!conversation) {
    return notFound();
  }

  const { data: messages } = await supabase
    .from('messages')
    .select('*, author:profiles(*)')
    .eq('conversation_id', params.conversationId)
    .order('created_at', { ascending: true });

  const currentUserRole = conversation.user1.id === user.id
    ? conversation.user1.role
    : conversation.user2.role;

  const otherUser = conversation.user1.id === user.id
    ? conversation.user2
    : conversation.user1;

  return (
    <Chat
      conversationId={params.conversationId}
      initialMessages={messages || []}
      currentUser={{ id: user.id, role: currentUserRole }}
      otherUser={otherUser}
      canSendMessage={[
        UserRole.Farmer,
        UserRole.Expert,
        UserRole.Buyer
      ].includes(currentUserRole)}
    />
  );
}
