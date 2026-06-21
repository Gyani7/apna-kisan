'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";

export function PostCard({ post }: { post: any }) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={post.author.avatar_url} />
          <AvatarFallback>{post.author.full_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{post.author.full_name}</p>
            <p className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
          <p className="text-sm text-muted-foreground">@{post.author.username}</p>
          <p className="mt-4">{post.content}</p>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 mt-4">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4 mr-2" />
          Comment
        </Button>
      </div>
    </Card>
  );
}
