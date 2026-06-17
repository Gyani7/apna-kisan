import { Heart, MessageCircle, Share2, Bookmark, MapPin, MessageSquare, CircleHelp as HelpCircle, BookOpen, Bell, MoveHorizontal as MoreHorizontal } from 'lucide-react';

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  image_urls?: string[];
  is_featured?: boolean;
  created_at?: string;
}

export interface Post {
  id: string;
  user_id: string;
  post_type: 'question' | 'article' | 'notification' | 'story';
  title?: string;
  content: string;
  tags?: string[];
  likes_count: number;
  comments_count: number;
  location?: string;
  created_at: string;
  slug?: string;
  image_url?: string;
  is_liked?: boolean;
  is_bookmarked?: boolean;
  excerpt?: string;
  read_time?: number;
  category?: string;
  shares_count: number;
  is_featured?: boolean;
}

export interface Author {
  username: string;
  full_name?: string;
  avatar_url?: string;
  reputation: number;
  badge?: 'new' | 'bronze' | 'silver' | 'gold';
  location?: string;
}

export interface PostWithAuthor extends Post {
  author: Author;
}

export interface ReelData {
  id: string;
  created_at: string;
  video_url: string;
  caption?: string;
  likes_count: number;
  comments_count: number;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  village: {
    id: string;
    name: string;
  };
  comments: {
    id: string;
    content: string;
    created_at: string;
    user: {
      full_name: string;
    };
  }[];
  user_has_liked_reel: boolean;
}

export const POST_TYPE_CONFIG = {
  question: {
    icon: HelpCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Question',
    labelHi: 'सवाल'
  },
  article: {
    icon: BookOpen,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Article',
    labelHi: 'लेख'
  },
  notification: {
    icon: Bell,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    label: 'Notification',
    labelHi: 'सूचना'
  },
  story: {
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: 'Story',
    labelHi: 'कहानी'
  }
};

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // 1 year in seconds
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000; // 1 month in seconds
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400; // 1 day in seconds
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600; // 1 hour in seconds
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60; // 1 minute in seconds
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
}

export function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}
