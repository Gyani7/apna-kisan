'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase/client';
import { QuestionCard } from '@/components/community/QuestionCard';
import { StoryCard } from '@/components/community/StoryCard';
import { ReelCard } from '@/components/community/ReelCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function CommunityFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchFeed = async () => {
      const [questionsResult, storiesResult, reelsResult] = await Promise.all([
        supabase
          .from('questions')
          .select('*, author:profiles(*)')
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('stories')
          .select('*, author:profiles(*)')
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('reels')
          .select('*, author:profiles(*)')
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      const questions = questionsResult.data?.map(q => ({ ...q, type: 'question' })) || [];
      const stories = storiesResult.data?.map(s => ({ ...s, type: 'story' })) || [];
      const reels = reelsResult.data?.map(r => ({ ...r, type: 'reel' })) || [];

      const combinedFeed = [...questions, ...stories, ...reels]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setFeed(combinedFeed);
      setIsLoading(false);
    };

    fetchFeed();
  }, [supabase]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Community Feed</h2>
        <div className="flex gap-2">
            <Link href="/community/ask">
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Ask Question
                </Button>
            </Link>
            <Link href="/community/share-story">
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Story
                </Button>
            </Link>
             <Link href="/community/create-reel">
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Reel
                </Button>
            </Link>
        </div>
      </div>
      {feed.map((item) => {
        if (item.type === 'question') {
          return <QuestionCard key={`question-${item.id}`} question={item} />;
        }
        if (item.type === 'story') {
          return <StoryCard key={`story-${item.id}`} story={item} />;
        }
        if (item.type === 'reel') {
          return <ReelCard key={`reel-${item.id}`} reel={item} />;
        }
        return null;
      })}
    </div>
  );
}
