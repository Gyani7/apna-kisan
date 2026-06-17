'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export function QuestionCard({ question }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={question.author.avatar_url} />
            <AvatarFallback>{question.author.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{question.author.username}</p>
            <p className="text-sm text-muted-foreground">Asked on {new Date(question.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-lg">{question.title}</p>
        <p className="mt-2">{question.content}</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" size="sm">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Like ({question.likes || 0})
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Answer ({question.answers?.length || 0})
        </Button>
      </CardFooter>
    </Card>
  );
}
