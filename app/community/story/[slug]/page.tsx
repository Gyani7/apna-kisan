'use client';

import { getStoryBySlug } from '@/lib/actions/stories';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Story } from '@/lib/types';
import { AuthorHeader } from '@/components/community/AuthorHeader';
import { ShareButtons } from '@/components/community/ShareButtons';
import { BookmarkButton } from '@/components/community/BookmarkButton';

export default function StoryPage({ params }: { params: { slug:string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      getStoryBySlug(params.slug).then(({ data, error }) => {
        if (error || !data) {
          notFound();
        }
        setStory(data as Story);
        setIsLoading(false);
      });
    }
  }, [params.slug]);

  if (isLoading) {
    return <div className="container max-w-3xl mx-auto py-8 text-center">Loading...</div>;
  }

  if (!story) {
    return null; // notFound() will have already been called
  }

  const storyUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="container max-w-3xl mx-auto py-8">
        <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{story.title}</h1>
                <div className="text-lg text-muted-foreground">
                    <AuthorHeader author={story.author} createdAt={story.created_at} />
                </div>
            </header>
            
            <div dangerouslySetInnerHTML={{ __html: story.content }} />

            <footer className="mt-8 pt-4 border-t">
                <div className="flex items-center justify-between">
                    <ShareButtons url={storyUrl} title={story.title || ''} />
                    <BookmarkButton postId={story.id} />
                </div>
            </footer>
        </article>
    </div>
  );
}
