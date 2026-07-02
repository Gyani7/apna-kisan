
'use client';

import { useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { Database } from '@/lib/database.types';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createSupabaseClient();
  const router = useRouter();

  const handlePost = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return toast({
        title: 'Error',
        description: 'You must be logged in to create a post.',
        variant: 'destructive',
      });
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content, user_id: user.id, post_type: 'story', slug }] as any);

    setIsLoading(false);

    if (error) {
      return toast({
        title: 'Error creating post',
        description: error.message,
        variant: 'destructive',
      });
    }

    router.push('/community');
    router.refresh();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <div className="grid gap-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <Button onClick={handlePost} disabled={isLoading || !content.trim() || !title.trim()}>
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}Post
        </Button>
      </div>
    </div>
  );
}
