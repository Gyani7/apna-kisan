 import { Heart, MessageCircle, Share2, Bookmark, MapPin, MessageSquare, CircleHelp as HelpCircle, BookOpen, Bell, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import { StaticImageData } from "next/image";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    PRO_USER = 'pro_user',
    FARMER = 'farmer',
    EXPERT = 'expert',
    BUYER = 'buyer',
}

export enum NotificationType {
    WELCOME = 'welcome',
    NEW_USER = 'new_user',
    NEW_LIKE = 'new_like',
    NEW_COMMENT = 'new_comment',
    NEW_ANSWER = 'new_answer',
}

export interface WelcomeNotificationMetadata {}
export interface NewUserNotificationMetadata { new_user_id: string; }
export interface NewLikeNotificationMetadata { post_id: string; liked_by_user_id: string; }
export interface NewCommentNotificationMetadata { post_id: string; comment_id: string; commented_by_user_id: string; }
export interface NewAnswerNotificationMetadata { question_id: string; answer_id: string; answered_by_user_id: string; }

export type NotificationMetadata =
    | WelcomeNotificationMetadata
    | NewUserNotificationMetadata
    | NewLikeNotificationMetadata
    | NewCommentNotificationMetadata
    | NewAnswerNotificationMetadata;


export interface Notification {
    id: string;
    user_id: string;
    message: string;
    is_read: boolean;
    created_at: string;
    type: NotificationType;
    metadata: NotificationMetadata;
}

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

export interface Author {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

export interface PostWithAuthor {
  id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  post_type: 'question' | 'story' | 'reel' | 'product' | 'mandi_rate';
  category: string | null;
  tags: string[] | null;
  slug: string | null;
  excerpt: string | null;
  read_time: number | null;
  is_featured: boolean | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  author: Author;
}

export interface Answer {
  id: string;
  content: string;
  created_at: string;
  author: Author;
}

interface BaseFeedItem {
    id: string;
    created_at: string;
    author: Author;
    likes_count: number;
    comments_count: number;
    is_liked: boolean;
    is_bookmarked: boolean;
}

export interface Question extends BaseFeedItem {
    type: 'question';
    title: string;
    content: string;
    slug: string;
    answers: Answer[];
}

export interface Story extends BaseFeedItem {
    type: 'story';
    title: string;
    content: string;
    slug: string;
    thumbnail_url: string | StaticImageData;
}

export interface Reel extends BaseFeedItem {
    type: 'reel';
    caption?: string;
    video_url: string;
    thumbnail_url?: string;
}

export type FeedItemType = Question | Story | Reel;

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

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
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