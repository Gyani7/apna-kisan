export interface UserInfo {
  id: string;
  username: string;
  avatar_url: string;
  full_name: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  postType: string;
  category: string | null;
  tags: string[] | null;
  slug: string;
  excerpt: string | null;
  readTime: number | null;
  isFeatured: boolean;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  author: UserInfo;
  is_liked: boolean;
  is_bookmarked: boolean;
  type: 'post';
}

export enum UserRole {
  Farmer = 'FARMER',
  Expert = 'EXPERT',
  Admin = 'ADMIN',
  Buyer = 'BUYER',
  User = 'USER',
  ProUser = 'PRO_USER',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  farmer_id: string;
  title: string;
  category: string;
  image_url: string;
}

export interface Reel {
  id: string;
  video_url: string;
  caption: string;
  author: UserInfo;
  created_at: string;
  type: 'reel';
}

export interface Story {
  id: string;
  image_url: string;
  caption: string;
  author: UserInfo;
  created_at: string;
  title: string;
  content: string;
  slug: string;
  thumbnail_url: string;
  type: 'story';
}

export interface Notification {
  id: string;
  type: NotificationType;
  metadata: any;
  is_read: boolean;
  created_at: string;
  message: string;
}

export enum NotificationType {
  NEW_LIKE = 'new_like',
  NEW_COMMENT = 'new_comment',
  NEW_FOLLOWER = 'new_follower',
  WELCOME = 'welcome',
  NEW_USER = 'new_user',
}

export const POST_TYPE_CONFIG = {
  question: {
    label: 'Question',
    notification: (metadata: any) => `New answer to your question: ${metadata.question_title}`,
  },
  story: {
    label: 'Story',
    notification: (metadata: any) => `New story from ${metadata.author_name}`,
  },
  reel: {
    label: 'Reel',
    notification: (metadata: any) => `New reel from ${metadata.author_name}`,
  },
};

export interface NewLikeNotificationMetadata {
  post_id: string;
  post_type: string;
}

export type FeedItemType = Post | Reel | Story | Question;

export const timeAgo = (date: string) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
};

export const formatCount = (count: number) => {
  if (count < 1000) {
    return count;
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return `${(count / 1000000).toFixed(1)}M`;
};

export interface Answer {
  id: string;
  content: string;
  author: UserInfo;
  created_at: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: UserInfo;
  created_at: string;
  answers: Answer[];
  slug: string;
  type: 'question';
}

export interface PostWithAuthor extends Post {
  author: UserInfo;
}
