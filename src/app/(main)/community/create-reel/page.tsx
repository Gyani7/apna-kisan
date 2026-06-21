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
import withAuthorization from '@/components/withAuthorization';
import { UserRole } from '@/lib/types';

function CreateReelPage() {
  const [caption, setCaption] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createBrowserClient();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = await getUser();
    if (!user) {
      toast({ title: 'Please log in to create a reel.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    if (!video) {
      toast({ title: 'Please select a video to upload.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase.storage
      .from('reels')
      .upload(`${user.id}/${Date.now()}_${video.name}`, video);

    if (error) {
      console.error('Error uploading video:', error);
      toast({ title: 'Error uploading video', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage.from('reels').getPublicUrl(data.path);
    const videoUrl = publicUrlData.publicUrl;

    const { error: reelError } = await supabase.from('reels').insert({
      author_id: user.id,
      caption,
      video_url: videoUrl,
    });

    if (reelError) {
      console.error('Error creating reel:', reelError);
      toast({ title: 'Error creating reel', variant: 'destructive' });
    } else {
      toast({ title: 'Reel created successfully!' });
      router.push('/community');
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Reel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="video">Upload Video</label>
            <Input id="video" type="file" onChange={handleVideoChange} accept="video/*" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="caption">Caption</label>
            <Textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Reel'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(CreateReelPage, [UserRole.FARMER, UserRole.EXPERT, UserRole.BUYER]);
