'use client';

import { useState, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/actions/feed';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function CreatePostForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [postType, setPostType] = useState('question');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handlePostCreation = async (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      try {
        await createPost({ content: formData.get('content') as string });
        formRef.current?.reset();
        router.push('/community');
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <form ref={formRef} action={handlePostCreation} className="space-y-8">
      {error && (
         <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="postType">Post Type</Label>
        <Select
          name="postType"
          defaultValue="question"
          onValueChange={setPostType}
          required
        >
          <SelectTrigger id="postType">
            <SelectValue placeholder="Select a post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="story">Story</SelectItem>
            <SelectItem value="reel">Reel</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Choose the type of content you want to create.
        </p>
      </div>

      {postType === 'question' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="What's your question?" required minLength={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" placeholder="Provide more details..." required minLength={20} rows={8} />
          </div>
        </>
      )}

      {postType === 'story' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Give your story a title" required minLength={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Story</Label>
            <Textarea id="content" name="content" placeholder="Write your story..." required minLength={50} rows={12} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
            <p className="text-sm text-muted-foreground">Upload a thumbnail image for your story.</p>
          </div>
        </>
      )}

      {postType === 'reel' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea id="caption" name="caption" placeholder="Add a caption..." maxLength={280} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video">Video</Label>
            <Input id="video" name="video" type="file" accept="video/*" required />
            <p className="text-sm text-muted-foreground">Upload your video file.</p>
          </div>
        </>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Create Post'}
      </Button>
    </form>
  );
}
