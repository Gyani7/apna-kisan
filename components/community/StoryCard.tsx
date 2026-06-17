'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export function StoryCard({ story }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={story.author.avatar_url} />
            <AvatarFallback>{story.author.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{story.author.username}</p>
            <p className="text-sm text-muted-foreground">Shared on {new Date(story.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {story.image_url && <img src={story.image_url} alt="Story image" className="rounded-md w-full h-auto object-cover max-h-96" />}
        <p className="mt-4">{story.content}</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" size="sm">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Like ({story.likes || 0})
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Comment ({story.comments?.length || 0})
        </Button>
      </CardFooter>
    </Card>
  );
}
