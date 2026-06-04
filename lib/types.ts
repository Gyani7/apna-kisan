export interface Post {
  id: string;
  userId: string;
  farmerName: string;
  farmerAvatar: string | null;
  location: string;
  content: string;
  imageUrl: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Profile {
  id: string;
  username: string;
  fullName: string | null;
  avatarUrl: string | null;
  location: string | null;
  bio: string | null;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
