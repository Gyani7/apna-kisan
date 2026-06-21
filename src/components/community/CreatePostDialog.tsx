
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/actions/feed';

export function CreatePostDialog() {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handlePost = async () => {
    await createPost({ content }); 
    
    setOpen(false);
    setContent("");

    // Refresh the page to show the new post
    router.refresh(); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handlePost} type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
