'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeedItemType, timeAgo, formatCount, Post } from '@/lib/types';
import { createSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';

const supabase = createSupabaseClient();

async function toggleLike(postId: string, userId: string) {
    await supabase.rpc('toggle_like');
}

async function toggleBookmark(postId: string, userId: string) {
    await supabase.rpc('toggle_bookmark');
}

async function deletePost(postId: string) {
    return await supabase.from('posts').delete().eq('id', postId);
}

interface PostCardProps {
  post: FeedItemType;
  onDelete?: (postId: string) => void;
}

function isPost(item: FeedItemType): item is Post {
    return item.type === 'post';
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(isPost(post) ? post.is_liked : false);
  const [likesCount, setLikesCount] = useState(isPost(post) ? post.likesCount : 0);
  const [isBookmarked, setIsBookmarked] = useState(isPost(post) ? post.is_bookmarked : false);

  async function handleLike() {
    if (!user || !isPost(post)) return;
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    await toggleLike(post.id, user.uid);
  }

  async function handleBookmark() {
    if (!user || !isPost(post)) return;
    setIsBookmarked((prev) => !prev);
    await toggleBookmark(post.id, user.uid);
  }
  
  const handleDelete = async () => {
    if (!user || post.author.id !== user.uid) return;
    
    const { error } = await deletePost(post.id);

    if (error) {
      toast({ title: 'Error deleting post', variant: 'destructive' });
    } else {
      toast({ title: 'Post deleted' });
      if (onDelete) {
        onDelete(post.id);
      }
    }
  };

  const authorName = post.author?.full_name ?? post.author?.username ?? 'Anonymous';
  const authorInitials = authorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const getPostLink = () => {
    if (post.type === 'story') return `/community/story/${post.slug}`;
    if (post.type === 'question') return `/community/question/${post.slug}`;
    if (post.type === 'reel') return `/community/reel/${post.id}`;
    return `/community/post/${post.slug}`;
  };

  const getPostTitle = () => {
    if (isPost(post)) return post.title;
    if (post.type === 'story') return post.title;
    if (post.type === 'question') return post.title;
    return ''
  }

  const getPostContent = () => {
    if (isPost(post)) return post.content;
    if (post.type === 'story') return post.content;
    if (post.type === 'question') return post.content;
    if (post.type === 'reel') return post.caption;
    return ''
  }

  const getPostImageUrl = () => {
    if (isPost(post)) return post.imageUrl;
    if (post.type === 'story') return post.thumbnail_url;
    return null;
  }

  const postLink = getPostLink();
  const createdAt = isPost(post) ? post.createdAt : post.created_at;
  const title = getPostTitle();
  const content = getPostContent();
  const imageUrl = getPostImageUrl();

  const postActions = [
    {
      label: 'Like',
      icon: Heart,
      count: likesCount,
      isToggled: isLiked,
      onClick: handleLike,
      color: 'hover:text-red-500',
      toggledColor: 'text-red-500',
      hidden: !isPost(post)
    },
    {
      label: 'Comment',
      icon: MessageCircle,
      count: isPost(post) ? post.commentsCount : 0,
      href: `${postLink}#comments`,
      color: 'hover:text-blue-500',
    },
    {
      label: 'Share',
      icon: Share2,
      count: 0,
      onClick: () => { toast({ title: 'Link copied to clipboard!' }); navigator.clipboard.writeText(`${window.location.origin}${postLink}`)}, 
      color: 'hover:text-green-500',
    },
  ];

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Link href={`/profile/${post.author.id}`}>
          <Avatar>
            <AvatarImage src={post.author?.avatar_url} alt={authorName} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post.author.id}`} className="font-semibold hover:underline">
              {authorName}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            <time dateTime={createdAt}>{timeAgo(createdAt)}</time>
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Block User</DropdownMenuItem>
            {user && post.author.id === user.uid && <DropdownMenuItem onClick={handleDelete} className="text-red-500">Delete Post</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {post.type !== 'reel' && (
          <Link href={postLink} className="block">
            <h2 className="text-xl font-bold mb-2 hover:underline">{title}</h2>
          </Link>
        )}
        <p className="text-muted-foreground line-clamp-3">{content}</p>
        {imageUrl && (
          <div className="mt-4 relative aspect-video rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title || 'Post image'} fill className="object-cover" />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between p-4 border-t">
        <div className="flex gap-4">
          {postActions.map((action) => (
            !action.hidden && (action.href ? (
              <Link key={action.label} href={action.href} className={cn('flex items-center gap-2 text-muted-foreground transition-colors', action.color)}>
                <action.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{formatCount(action.count)}</span>
              </Link>
            ) : (
              <Button
                key={action.label}
                variant="ghost"
                size="sm"
                className={cn(
                  'flex items-center gap-2 text-muted-foreground transition-colors',
                  action.color,
                  action.isToggled && action.toggledColor
                )}
                onClick={action.onClick}
              >
                <action.icon className={cn('h-5 w-5', action.isToggled && 'fill-current')} />
                <span className="font-medium text-sm">{formatCount(action.count)}</span>
              </Button>
            ))
          ))}
        </div>
        {isPost(post) && <Button variant="ghost" size="icon" onClick={handleBookmark} className={cn('text-muted-foreground hover:text-yellow-500', isBookmarked && 'text-yellow-500')}>
          <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
        </Button>}
      </CardFooter>
    </Card>
  );
}
