'use client';

import type { UnifiedPost, QuestionPost, StoryPost, ReelPost } from '@/lib/actions/feed';
import Link from 'next/link';

// --- MAIN FEED COMPONENT ---

interface UnifiedGlobalFeedProps {
  initialFeed: UnifiedPost[];
}

export default function UnifiedGlobalFeed({ initialFeed }: UnifiedGlobalFeedProps) {
  // In the future, this component can be extended with state management 
  // for infinite scroll, real-time updates, etc.

  return (
    <div className="space-y-6">
      {(initialFeed || []).map((post) => {
        const key = `${post.type}-${post.id}`;
        switch (post.type) {
          case 'question':
            return <QuestionCard key={key} post={post} />;
          case 'story':
            return <StoryCard key={key} post={post} />;
          case 'reel':
            return <ReelCard key={key} post={post} />;
          default:
            // This helps in identifying if a new, unhandled post type is added.
            console.warn('Unsupported post type:', (post as any).type);
            return null;
        }
      })}
    </div>
  );
}

// --- POST-TYPE SPECIFIC CARD COMPONENTS ---

function QuestionCard({ post }: { post: QuestionPost }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all hover:shadow-lg">
      <AuthorHeader author={post.author} createdAt={post.created_at} />
      <Link href={`/questions/${post.slug}`} className="block mt-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h2>
        {post.content && <p className="text-gray-600 dark:text-gray-400 mt-2 truncate">{post.content}</p>}
      </Link>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
        <span>{post.vote_count} votes</span>
        <span>{post.answer_count} answers</span>
      </div>
    </div>
  );
}

function StoryCard({ post }: { post: StoryPost }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-lg">
      {post.thumbnail_url && (
        <Link href={`/story/${post.slug}'}>
          <img src={post.thumbnail_url} alt={post.title} className="w-full h-48 object-cover" />
        </Link>
      )}
      <div className="p-4">
        <AuthorHeader author={post.author} createdAt={post.created_at} />
        <Link href={`/story/${post.slug}`} className="block mt-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h2>
          {post.content && <p className="text-gray-600 dark:text-gray-400 mt-2 truncate">{post.content}</p>}
        </Link>
      </div>
    </div>
  );
}

function ReelCard({ post }: { post: ReelPost }) {
  // A reel might not have a dedicated page, so we link to the author's profile.
  const authorLink = post.author?.username ? `/profile/${post.author.username}` : '#';
  return (
    <div className="bg-black border border-gray-700 rounded-lg overflow-hidden relative aspect-[9/16]">
      <video src={post.video_url} loop playsInline className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <AuthorHeader author={post.author} createdAt={post.created_at} />
          {post.caption && <p className="mt-2 text-sm">{post.caption}</p>}
          <div className="mt-2 text-xs">{post.like_count} likes</div>
      </div>
    </div>
  );
}

// --- COMMON UI COMPONENTS ---

interface AuthorHeaderProps {
    author: QuestionPost['author'] | StoryPost['author'] | ReelPost['author'];
    createdAt: string;
}

function AuthorHeader({ author, createdAt }: AuthorHeaderProps) {
    const profileLink = author?.username ? `/profile/${author.username}` : '#';

    return (
        <Link href={profileLink} className="flex items-center group">
            <img 
                src={author?.avatar_url || 'https://supabase.com/docs/img/supabase-logo-icon.svg'}
                alt={author?.username || 'Anonymous'}
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-500"
            />
            <div className="ml-3">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:underline">
                    {author?.full_name || 'Anonymous User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(createdAt).toLocaleDateString()} 
                    {author?.username && `· @${author.username}`}
                </p>
            </div>
        </Link>
    );
}