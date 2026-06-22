
'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';

export default function ConversationPage({ params }: { params: { conversation_id: string } }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  useEffect(() => {
    const fetchMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*, profiles (username)')
        .eq('conversation_id', params.conversation_id)
        .order('created_at');

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`conversation:${params.conversation_id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${params.conversation_id}` },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.conversation_id, supabase]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId) return;

    setIsLoading(true);
    const { error } = await supabase.from('messages').insert([
      {
        conversation_id: parseInt(params.conversation_id),
        sender_id: userId,
        content: newMessage,
      },
    ]);

    if (error) {
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNewMessage('');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 h-[calc(100vh-6rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded-lg">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender_id === userId ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`rounded-lg px-4 py-2 ${message.sender_id === userId ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="text-sm font-semibold">{message.profiles?.username ?? 'User'}</p>
              <p>{message.content}</p>
              <p className="text-xs text-right text-muted-foreground">{new Date(message.created_at).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </div>
    </div>
  );
}
