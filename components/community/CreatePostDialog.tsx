'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CreatePostDialog({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handlePost = () => {
    // This is a placeholder for the actual API call
    const newPost = {
      id: Math.random(),
      content,
      author: {
        full_name: 'New User',
        username: 'newuser',
        avatar_url: 'https://i.pravatar.cc/150?u=newuser',
      },
      created_at: new Date().toISOString(),
    };
    onPostCreated(newPost);
    setOpen(false);
    setContent("");
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
            placeholder="What\'s on your mind?"
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
