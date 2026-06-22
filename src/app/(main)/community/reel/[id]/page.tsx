'use client';

import { getReelById } from '@/lib/actions/reels';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Reel } from '@/lib/types';
import { AuthorHeader } from '@/components/community/AuthorHeader';
import { ReelCard } from '@/components/community/ReelCard';

export default function ReelPage({ params }: { params: { id: string } }) {
  const [reel, setReel] = useState<Reel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getReelById(params.id).then(({ data, error }) => {
        if (error || !data) {
          notFound();
        }
        setReel(data as Reel);
        setIsLoading(false);
      });
    }
  }, [params.id]);

  if (isLoading) {
    return <div className="container max-w-sm mx-auto py-8 text-center">Loading...</div>;
  }

  if (!reel) {
    return null; // notFound() will have already been called
  }

  return (
    <div className="container max-w-sm mx-auto py-8">
        <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
                <AuthorHeader author={reel.author} createdAt={reel.created_at} />
            </div>
            <ReelCard reel={reel} />
        </div>
    </div>
  );
}
