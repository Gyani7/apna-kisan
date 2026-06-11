import { MessageSquare, CircleHelp, BookOpen } from 'lucide-react';

export const POST_TYPES = [
  { label: 'Post', labelHi: 'Charcha', href: '/create?type=discussion', icon: MessageSquare, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
  { label: 'Ask', labelHi: 'Sawaal', href: '/create?type=question', icon: CircleHelp, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
  { label: 'Story', labelHi: 'Kahani', href: '/create?type=story', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
];
