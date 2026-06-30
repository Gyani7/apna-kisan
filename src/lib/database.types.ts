export type Json = | string | number | boolean | null | { [key: string]: Json } | Json[]

export type PostRow = Database['public']['Tables']['posts']['Row'];
export type MandiRateRow = Database['public']['Tables']['mandi_rates']['Row'];
export type FarmingTipRow = Database['public']['Tables']['farming_tips']['Row'];
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          image_url: string | null
          post_type: string
          category: string | null
          tags: string[] | null
          slug: string
          excerpt: string | null
          read_time: number | null
          is_featured: boolean
          likes_count: number
          comments_count: number
          shares_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          image_url?: string | null
          post_type: string
          category?: string | null
          tags?: string[] | null
          slug: string
          excerpt?: string | null
          read_time?: number | null
          is_featured?: boolean
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          image_url?: string | null
          post_type?: string
          category?: string | null
          tags?: string[] | null
          slug?: string
          excerpt?: string | null
          read_time?: number | null
          is_featured?: boolean
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
        }
      },
      mandi_rates: {
        Row: {
          id: number;
          crop: string;
          price: number;
          location: string;
          updated_at: string;
        }
      },
      farming_tips: {
        Row: {
            id: number;
            title: string;
            content: string;
            is_active: boolean;
            created_at: string;
        }
      },
      profiles: {
        Row: {
            id: string;
            username: string;
            avatar_url: string;
            full_name: string;
        }
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
