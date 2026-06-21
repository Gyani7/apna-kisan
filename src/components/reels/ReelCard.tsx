'use client';

import { Card, CardContent } from '@/components/ui/card';

export function ReelCard({ reel }: { reel: any }) {
  return (
    <Card>
      <CardContent>
        <video src={reel.videoUrl} controls />
      </CardContent>
    </Card>
  );
}
