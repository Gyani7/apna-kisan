export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          avatar_url: string | null;
          cover_url: string | null;
          location: string | null;
          bio: string | null;
          reputation: number;
          badge: string;
          posts_count: number;
          followers_count: number;
          following_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          avatar_url?: string | null;
          cover_url?: string | null;
          location?: string | null;
          bio?: string | null;
          reputation?: number;
          badge?: string;
          posts_count?: number;
          followers_count?: number;
          following_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          cover_url?: string | null;
          location?: string | null;
          bio?: string | null;
          reputation?: number;
          badge?: string;
          posts_count?: number;
          followers_count?: number;
          following_count?: number;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          content: string;
          image_url: string | null;
          post_type: string;
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
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          content: string;
          image_url?: string | null;
          post_type?: string;
          category?: string | null;
          tags?: string[];
          slug?: string | null;
          excerpt?: string | null;
          read_time?: number | null;
          is_featured?: boolean;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string | null;
          content?: string;
          image_url?: string | null;
          post_type?: string;
          category?: string | null;
          tags?: string[];
          slug?: string | null;
          excerpt?: string | null;
          read_time?: number | null;
          is_featured?: boolean;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: never;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
      followers: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: never;
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: never;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          actor_id: string;
          type: string;
          post_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          actor_id: string;
          type: string;
          post_id?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          is_read?: boolean;
        };
      };
      stories: {
        Row: {
          id: string;
          user_id: string;
          media_url: string;
          media_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          media_url: string;
          media_type?: string;
          created_at?: string;
        };
        Update: never;
      };
      story_views: {
        Row: {
          id: string;
          story_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          story_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: never;
      };
      reels: {
        Row: {
          id: string;
          user_id: string;
          video_url: string;
          thumbnail_url: string | null;
          caption: string | null;
          likes_count: number;
          comments_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_url: string;
          thumbnail_url?: string | null;
          caption?: string | null;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
        };
        Update: {
          thumbnail_url?: string | null;
          caption?: string | null;
          likes_count?: number;
          comments_count?: number;
        };
      };
      mandi_rates: {
        Row: {
          id: string;
          commodity: string;
          mandi: string;
          state: string;
          price: number;
          change_percent: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          commodity: string;
          mandi: string;
          state: string;
          price: number;
          change_percent?: number;
          updated_at?: string;
        };
        Update: {
          commodity?: string;
          mandi?: string;
          state?: string;
          price?: number;
          change_percent?: number;
          updated_at?: string;
        };
      };
      farming_tips: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string;
          color_class: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon_name?: string;
          color_class?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon_name?: string;
          color_class?: string;
          is_active?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type PostRow = Database['public']['Tables']['posts']['Row'];
export type LikeRow = Database['public']['Tables']['likes']['Row'];
export type CommentRow = Database['public']['Tables']['comments']['Row'];
export type FollowerRow = Database['public']['Tables']['followers']['Row'];
export type BookmarkRow = Database['public']['Tables']['bookmarks']['Row'];
export type NotificationRow = Database['public']['Tables']['notifications']['Row'];
export type StoryRow = Database['public']['Tables']['stories']['Row'];
export type ReelRow = Database['public']['Tables']['reels']['Row'];
export type MandiRateRow = Database['public']['Tables']['mandi_rates']['Row'];
export type FarmingTipRow = Database['public']['Tables']['farming_tips']['Row'];
