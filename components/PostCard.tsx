'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, MessageSquare, CircleHelp as HelpCircle, BookOpen, Bell, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { PostWithAuthor, POST_TYPE_CONFIG, timeAgo, formatCount } from '@/lib/types';
import { toggleLike, toggleBookmark } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';

const TYPE_ICONS: Record<string, typeof MessageSquare> = { discussion: MessageSquare, question: HelpCircle, story: BookOpen, update: Bell };

interface PostCardProps {
  post: PostWithAuthor;
  compact?: boolean;
}

export default function PostCard({ post, compact }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.is_liked ?? false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmarked ?? false);
  const { user } = useAuth();

  const config = POST_TYPE_CONFIG[post.post_type];
  const TypeIcon = TYPE_ICONS[post.post_type] ?? MessageSquare;

  async function handleLike() {
    if (!user) return;
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    await toggleLike(post.id, user.id);
  }

  async function handleBookmark() {
    if (!user) return;
    setIsBookmarked((prev) => !prev);
    await toggleBookmark(post.id, user.id);
  }

  const authorName = post.author?.full_name ?? post.author?.username ?? 'Kisan';
  const initials = authorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <article className="card overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.user_id}`}>
            {post.author?.avatar_url ? (
              <Image src={post.author.avatar_url} alt={authorName} width={44} height={44} className="rounded-full object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{initials}</div>
            )}
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link href={`/profile/${post.user_id}`} className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight hover:underline">{authorName}</Link>
              {post.author?.badge && (
                <span className="badge bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-400">{post.author.badge}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {post.author?.location && <><MapPin size={11} className="text-brand-500 shrink-0" /><span className="text-xs text-gray-500 dark:text-gray-400">{post.author.location}</span><span className="text-gray-300 dark:text-gray-600 text-xs">&middot;</span></>}
              <span className="text-xs text-gray-400 dark:text-gray-500">{timeAgo(post.created_at)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={clsx('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', config.color, config.bgColor)}>
            <TypeIcon size={12} />
            {config.labelHi}
          </span>
          <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 pb-2">
        {post.title && (
          <Link href={post.slug ? `/story/${post.slug}` : '#'} className="block">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base leading-snug hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{post.title}</h3>
          </Link>
        )}
        <p className={clsx('text-gray-700 dark:text-gray-300 leading-relaxed', compact ? 'text-xs line-clamp-2' : 'text-sm', post.title && 'mt-1')}>
          {post.content}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-brand-600 dark:text-brand-400 font-medium bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        )}
        {post.category && (
          <Link href={`/category/${post.category}`} className="text-xs text-gray-400 hover:text-brand-500 mt-1.5 inline-block">{post.category}</Link>
        )}
      </div>

      {post.image_url && (
        <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 mt-1">
          <Image src={post.image_url} alt="Post image" fill className="object-cover" sizes="(max-width: 512px) 100vw, 512px" />
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-50 dark:border-gray-700/50">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={clsx('flex items-center gap-1.5 transition-colors active:scale-95', isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-400')} aria-label={isLiked ? 'Unlike' : 'Like'}>
            <Heart size={18} className={clsx('transition-all', isLiked && 'fill-current')} />
            <span className="text-sm font-medium">{formatCount(likesCount)}</span>
          </button>
          <Link href={`/community/${post.id}`} className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{formatCount(post.comments_count)}</span>
          </Link>
          <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <Share2 size={18} />
            {post.shares_count > 0 && <span className="text-sm font-medium">{formatCount(post.shares_count)}</span>}
          </button>
        </div>
        <button onClick={handleBookmark} className={clsx('transition-colors active:scale-95', isBookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500 hover:text-brand-500')} aria-label={isBookmarked ? 'Unsave' : 'Save'}>
          <Bookmark size={18} className={clsx(isBookmarked && 'fill-current')} />
        </button>
      </div>
    </article>
  );
}
