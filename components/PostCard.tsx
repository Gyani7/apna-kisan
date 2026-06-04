'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { Post } from '@/lib/types';
import { timeAgo, formatCount } from '@/lib/mock-data';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isSaved, setIsSaved] = useState(false);

  function handleLike() {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }

  const initials = post.farmerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          {post.farmerAvatar ? (
            <Image
              src={post.farmerAvatar}
              alt={post.farmerName}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initials}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-tight">
              {post.farmerName}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-green-500 shrink-0" />
              <span className="text-xs text-gray-500">{post.location}</span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="relative w-full aspect-[4/3] bg-gray-100">
          <Image
            src={post.imageUrl}
            alt="Post image"
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-50">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={clsx(
              'flex items-center gap-1.5 transition-colors active:scale-95',
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
            )}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              size={20}
              className={clsx('transition-all', isLiked && 'fill-current')}
            />
            <span className="text-sm font-medium">{formatCount(likesCount)}</span>
          </button>

          <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm font-medium">
              {formatCount(post.commentsCount)}
            </span>
          </button>

          <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        <button
          onClick={() => setIsSaved((prev) => !prev)}
          className={clsx(
            'transition-colors active:scale-95',
            isSaved ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
          )}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          <Bookmark size={20} className={clsx(isSaved && 'fill-current')} />
        </button>
      </div>
    </article>
  );
}
