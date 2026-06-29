
'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { getUser } from '@/lib/user';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import withAuthorization from '@/components/withAuthorization';
import { UserRole } from '@/lib/types';

function ChatPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const fetchConversations = async () => {
      const user = await getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          other_user:profiles!conversations_other_user_id_fkey(*)
        `)
        .or(`user_1_id.eq.${user.id},user_2_id.eq.${user.id}`);

      if (error) {
        console.error('Error fetching conversations:', error);
      } else {
        setConversations(data);
      }
      setIsLoading(false);
    };

    fetchConversations();
  }, [supabase]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <div className="space-y-2">
        {conversations.map((conv) => (
          <Link href={`/chat/${conv.id}`} key={conv.id}>
            <div className="p-3 bg-white rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-50">
              <Avatar>
                <AvatarImage src={conv.other_user.avatar_url} />
                <AvatarFallback>{conv.other_user.username?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{conv.other_user.username}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default withAuthorization(ChatPage, [UserRole.FARMER, UserRole.EXPERT, UserRole.BUYER]);
