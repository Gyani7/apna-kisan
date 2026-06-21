'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StoryCard({ story }: { story: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{story.content}</p>
      </CardContent>
    </Card>
  );
}
