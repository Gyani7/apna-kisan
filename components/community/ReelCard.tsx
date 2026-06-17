'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export function ReelCard({ reel }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={reel.author.avatar_url} />
            <AvatarFallback>{reel.author.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{reel.author.username}</p>
            <p className="text-sm text-muted-foreground">Posted on {new Date(reel.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Placeholder for video player */}
        <div className="w-full bg-black aspect-video flex items-center justify-center">
          <p className="text-white">Video placeholder</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <p>{reel.caption}</p>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon">
            <ThumbsUp className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
