'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Story, timeAgo } from '@/lib/types';
import { BookOpenIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export default function StoryCard({ story, featured }: StoryCardProps) {
  const authorName = story.author?.full_name ?? story.author?.username ?? 'Kisan';

  if (featured) {
    return (
      <Link href={story.slug ? `/community/story/${story.slug}` : '#'} className="block group">
        <article className="relative overflow-hidden rounded-2xl h-72 card-hover">
          {story.thumbnail_url ? (
            <Image src={story.thumbnail_url} alt={story.title ?? ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-2', 'text-white', 'bg-green-500')}>
              <BookOpenIcon size={12} />
              Story
            </span>
            <h3 className="text-white font-bold text-lg leading-snug group-hover:underline">{story.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-gray-300 text-xs">
              <span className="font-semibold">{authorName}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={story.slug ? `/community/story/${story.slug}` : '#'} className="block group">
      <article className="card-hover overflow-hidden animate-fade-up">
        {story.thumbnail_url && (
          <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800">
            <Image src={story.thumbnail_url} alt={story.title ?? ''} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="400px" />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', 'text-green-800', 'bg-green-100')}>
              <BookOpenIcon size={12} />
              Story
            </span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{story.title}</h3>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {authorName[0]}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">{authorName}</span>
              <span>{timeAgo(story.created_at)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
