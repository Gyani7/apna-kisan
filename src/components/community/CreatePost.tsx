'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Video } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase/client';

export function CreatePost({ user }: { user: any }) {
  const [content, setContent] = useState('');
  const supabase = createSupabaseClient();

  const handlePost = async () => {
    if (content.trim() === '') return;

    const { error } = await supabase.from('posts').insert([
      { content: content, user_id: user.id },
    ]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      setContent('');
      // Optionally, refresh the posts list
    }
  };

  return (
    <div className="card-glass bg-premium-green-dark/60 border-premium-gold/30 p-4 rounded-lg">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name} />
          <AvatarFallback>{user?.user_metadata?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Textarea 
            placeholder={`Share your thoughts, ${user?.user_metadata?.name}...`} 
            className="bg-transparent border-0 placeholder-premium-white/50 text-premium-white focus:ring-0 resize-none" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <Image className="text-premium-gold hover:text-premium-gold-dark cursor-pointer" />
              <Video className="text-premium-gold hover:text-premium-gold-dark cursor-pointer" />
            </div>
            <Button onClick={handlePost} className="bg-gold-gradient text-premium-green-dark font-bold hover:opacity-90 transition-opacity">Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
