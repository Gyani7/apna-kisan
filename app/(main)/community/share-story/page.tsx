'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createBrowserClient } from '@/lib/supabase/client';
import { getUser } from '@/lib/user';
import { withAuthorization } from '@/components/withAuthorization';

function ShareStoryPage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createBrowserClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = await getUser();
    if (!user) {
      toast({ title: 'Please log in to share a story.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    let imageUrl: string | undefined;
    if (image) {
      const { data, error } = await supabase.storage
        .from('story-images')
        .upload(`${user.id}/${Date.now()}_${image.name}`, image);

      if (error) {
        console.error('Error uploading image:', error);
        toast({ title: 'Error uploading image', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('story-images').getPublicUrl(data.path);
      imageUrl = publicUrlData.publicUrl;
    }

    const { error: storyError } = await supabase.from('stories').insert({
      author_id: user.id,
      content,
      image_url: imageUrl,
    });

    if (storyError) {
      console.error('Error creating story:', storyError);
      toast({ title: 'Error creating story', variant: 'destructive' });
    } else {
      toast({ title: 'Story shared successfully!' });
      router.push('/community');
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="content">Your Story</label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="image">Add an Image</label>
            <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sharing...' : 'Share Story'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(ShareStoryPage, ['farmer', 'expert', 'buyer']);
