import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Key } from 'react';

export default async function ConversationsPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  const { data: conversationIdsData, error: idsError } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', user.id);

  if (idsError) {
    console.error('Error fetching conversation IDs:', idsError);
    return <div>Error loading conversations.</div>;
  }

  const conversationIds = conversationIdsData.map(item => item.conversation_id);

  let conversations: any[] = [];
  if (conversationIds.length > 0) {
    const { data, error } = await supabase
      .from('conversations')
      .select('id, conversation_participants ( profiles (username) )')
      .in('id', conversationIds);

    if (error) {
      console.error('Error fetching conversations:', error);
      return <div>Error loading conversations.</div>;
    } else if (data) {
      conversations = data;
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Conversations</h1>
      <div className="space-y-2">
        {conversations?.map((conversation: { id: Key | null | undefined; conversation_participants: any[]; }) => (
          <Link key={conversation.id} href={`/messages/${conversation.id}`}>
            <div className="border p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <h2 className="text-lg font-semibold">
                {conversation.conversation_participants
                  .filter(p => p.profiles?.username !== profile?.username)
                  .map(p => p.profiles?.username)
                  .join(', ')}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
