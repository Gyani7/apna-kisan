'use client';

import { useEffect, useState, useRef } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import withAuthorization from '@/components/withAuthorization';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { UserRole } from '@/lib/types';
import { User } from '@supabase/supabase-js';

function ConversationPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createSupabaseClient();
  const params = useParams();
  const conversationId = params?.conversationId as string;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!conversationId || !user) return;

    const fetchConversationDetails = async () => {
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*, user1:profiles!conversations_user_1_id_fkey(*), user2:profiles!conversations_user_2_id_fkey(*)')
        .eq('id', conversationId)
        .single();
      
      if (convError || !convData) {
        console.error('Error fetching conversation details:', convError);
        setIsLoading(false);
        return;
      }

      const other = convData.user1.id === user.id ? convData.user2 : convData.user1;
      setOtherUser(other);

      const { data, error } = await supabase
        .from('messages')
        .select('*, author:profiles(*)')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
      setIsLoading(false);
    };

    fetchConversationDetails();

    const handleNewMessage = async (payload: any) => {
      const { data: newMessage, error } = await supabase
        .from('messages')
        .select('*, author:profiles(*)')
        .eq('id', payload.new.id)
        .single();

      if (error) {
        console.error('Error fetching new message:', error);
      } else if (newMessage) {
        setMessages((currentMessages) => [...currentMessages, newMessage]);
      }
    };

    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleNewMessage)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [conversationId, supabase, user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !user) return;

    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      author_id: user.id,
      content: newMessage,
    });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-2xl mx-auto">
         <div className="p-4 bg-white shadow-md flex items-center gap-4 sticky top-0">
            <Link href="/chat">
                <Button variant="ghost" size="icon"><ArrowLeft /></Button>
            </Link>
            <Avatar>
              <AvatarImage src={otherUser?.avatar_url} />
              <AvatarFallback>{otherUser?.username?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">{otherUser?.username}</p>
        </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.author_id === otherUser?.id ? 'justify-start' : 'justify-end'}`}>
            {msg.author_id === otherUser?.id &&
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.author.avatar_url} />
                  <AvatarFallback>{msg.author.username?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            }
            <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.author_id === otherUser?.id ? 'bg-gray-200' : 'bg-primary text-primary-foreground'}`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
          <Button type="submit" size="icon"><Send /></Button>
        </form>
      </div>
    </div>
  );
}

export default withAuthorization(ConversationPage, [UserRole.FARMER, UserRole.EXPERT, UserRole.BUYER]);
