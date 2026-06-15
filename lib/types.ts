import { MessageSquare, CircleHelp as HelpCircle, BookOpen, Bell } from 'lucide-react';

export type PostType = 'discussion' | 'question' | 'story' | 'update';

export interface PostWithAuthor {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  image_url: string | null;
  post_type: PostType;
  category: string | null;
  tags: string[];
  slug: string | null;
  excerpt: string | null;
  read_time: number | null;
  is_featured: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    reputation: number;
    badge: string;
    location: string | null;
  } | null;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  is_best_answer: boolean;
  author: {
    avatar_url: string | null;
    full_name: string | null;
    reputation_level: string;
  } | null;
}

export interface CropHealthAnalysis {
  id: string;
  image_url: string;
  detected_disease: string;
  created_at: string;
  status: string;
  recommendations: string[];
  confidence_score: number;
}

export type ReelData = {
  id: string;
  created_at: string;
  video_url: string;
  caption: string | null;
  likes_count: number | null;
  comments_count: number | null;
  user: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  village: {
    id: number;
    name: string | null;
  } | null;
  comments: {
    id: string;
    content: string;
    created_at: string;
    user: {
        full_name: string | null;
    } | null
  }[];
  user_has_liked_reel: boolean;
};

export interface Category {
  slug: string;
  name: string;
  nameHi: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'crops', name: 'Crops & Cultivation', nameHi: 'Fasal', icon: '\u{1F33E}', description: 'Fasal ki khabar aur tips' },
  { slug: 'organic', name: 'Organic Farming', nameHi: 'Organic', icon: '\u{1F33F}', description: 'Prakritik kheti ke tarike' },
  { slug: 'market', name: 'Market & Prices', nameHi: 'Mandi Bhav', icon: '\u{1F4C8}', description: 'Mandi ke bhav aur trade' },
  { slug: 'machinery', name: 'Machinery & Tech', nameHi: 'Machine/Tech', icon: '\u{1F69C}', description: 'Tractor, drone, aur tech' },
  { slug: 'pest-control', name: 'Pest Control', nameHi: 'Rog Niyantran', icon: '\u{1F9EC}', description: 'Fasal ke rog aur ilaaj' },
  { slug: 'water', name: 'Water & Irrigation', nameHi: 'Sinchai', icon: '\u{1F4A7}', description: 'Paani bachat aur sinchai' },
  { slug: 'government', name: 'Govt Schemes', nameHi: 'Sarkari Yojana', icon: '\u{1F3DB}', description: 'Sarkari yojana aur subsidy' },
  { slug: 'livestock', name: 'Livestock & Dairy', nameHi: 'Pashu/Dairy', icon: '\u{1F404}', description: 'Pashu palan aur dairy' },
];

export const POST_TYPE_CONFIG: Record<PostType, { label: string; labelHi: string; color: string; bgColor: string; Icon: typeof MessageSquare }> = {
  discussion: { label: 'Discussion', labelHi: 'Charcha', color: 'text-blue-600', bgColor: 'bg-blue-50', Icon: MessageSquare },
  question: { label: 'Question', labelHi: 'Sawaal', color: 'text-amber-600', bgColor: 'bg-amber-50', Icon: HelpCircle },
  story: { label: 'Story', labelHi: 'Kahani', color: 'text-emerald-600', bgColor: 'bg-emerald-50', Icon: BookOpen },
  update: { label: 'Update', labelHi: 'Taaza Khabar', color: 'text-purple-600', bgColor: 'bg-purple-50', Icon: Bell },
};

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return 'abhi';
  if (diff < 3600) return `${Math.floor(diff / 60)}m pehle`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h pehle`;
  return `${Math.floor(diff / 86400)}d pehle`;
}

export function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}
