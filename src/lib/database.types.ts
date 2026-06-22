export type Json = | string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          avatar_url: string;
          reputation: number;
          badge: string;
          location: string;
          bio: string;
          posts_count: number;
          followers_count: number;
          following_count: number;
          is_verified: boolean;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          avatar_url: string;
          reputation?: number;
          badge?: string;
          location: string;
          bio: string;
          posts_count?: number;
          followers_count?: number;
          following_count?: number;
          is_verified?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          avatar_url?: string;
          reputation?: number;
          badge?: string;
          location?: string;
          bio?: string;
          posts_count?: number;
          followers_count?: number;
          following_count?: number;
          is_verified?: boolean;
        };
      };
      posts: {
        Row: {
          id: number;
          user_id: string;
          title: string;
          content: string;
          image_url: string;
          post_type: string;
          category: string;
          tags: string[];
          read_time: number;
          created_at: string;
          updated_at: string;
          excerpt: string;
          slug: string;
          likes_count: number;
          comments_count: number;
          is_featured: boolean;
          shares_count: number;
        };
        Insert: {
          id?: number;
          user_id: string;
          title: string;
          content: string;
          image_url: string;
          post_type: string;
          category: string;
          tags: string[];
          read_time: number;
          created_at?: string;
          updated_at?: string;
          excerpt: string;
          slug: string;
          likes_count?: number;
          comments_count?: number;
          is_featured?: boolean;
          shares_count?: number;
        };
        Update: {
          id?: number;
          user_id?: string;
          title?: string;
          content?: string;
          image_url?: string;
          post_type?: string;
          category?: string;
          tags?: string[];
          read_time?: number;
          created_at?: string;
          updated_at?: string;
          excerpt?: string;
          slug?: string;
          likes_count?: number;
          comments_count?: number;
          is_featured?: boolean;
          shares_count?: number;
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
          icon_name: string;
          color_class: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon_name?: string;
          color_class?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      mandi_rates: {
        Row: {
          id: string;
          market: string;
          commodity: string;
          price: number;
          date: string;
          state: string;
          change_percent: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          market: string;
          commodity: string;
          price: number;
          date: string;
          state: string;
          change_percent?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          market?: string;
          commodity?: string;
          price?: number;
          date?: string;
          state?: string;
          change_percent?: number;
          updated_at?: string;
        };
      };
      verified_farmers: {
        Row: {
          id: string;
          user_id: string;
          status: 'pending' | 'verified' | 'rejected';
          documents: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: 'pending' | 'verified' | 'rejected';
          documents: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: 'pending' | 'verified' | 'rejected';
          documents?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      village_data: {
        Row: {
          id: string;
          name: string;
          district: string;
          state: string;
          soil_health: Json;
          crop_stats: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          district: string;
          state: string;
          soil_health?: Json;
          crop_stats?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          district?: string;
          state?: string;
          soil_health?: Json;
          crop_stats?: Json;
          created_at?: string;
        };
      };
      schemes: {
        Row: {
          id: string;
          name: string;
          eligibility_criteria: Json;
          benefit: string;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          eligibility_criteria: Json;
          benefit: string;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          eligibility_criteria?: Json;
          benefit?: string;
          category?: string;
          created_at?: string;
        };
      };
      user_crops: {
        Row: {
          id: string;
          user_id: string;
          crop_type: string;
          planting_date: string;
          health_score: number;
          location: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          crop_type: string;
          planting_date: string;
          health_score?: number;
          location: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          crop_type?: string;
          planting_date?: string;
          health_score?: number;
          location?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Enums: {
      user_badge: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    };
    Functions: {};
  };
}

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type PostRow = Database['public']['Tables']['posts']['Row'];
export type FarmingTipRow = Database['public']['Tables']['farming_tips']['Row'];
export type MandiRateRow = Database['public']['Tables']['mandi_rates']['Row'];
export type VerifiedFarmerRow = Database['public']['Tables']['verified_farmers']['Row'];
export type VillageDataRow = Database['public']['Tables']['village_data']['Row'];
export type SchemeRow = Database['public']['Tables']['schemes']['Row'];
export type UserCropRow = Database['public']['Tables']['user_crops']['Row'];