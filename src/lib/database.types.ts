export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          role: string | null
        }
        Insert: {
          id: string
          username?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          role?: string | null
        }
      }
      posts: {
        Row: {
          id: number
          user_id: string
          title: string
          content: string
          slug: string
          post_type: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          content: string
          slug: string
          post_type: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          content?: string
          slug?: string
          post_type?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: number
          farmer_id: string
          name: string
          description: string | null
          price: number
          unit: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: number
          farmer_id: string
          name: string
          description?: string | null
          price: number
          unit?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          farmer_id?: string
          name?: string
          description?: string | null
          price?: number
          unit?: string | null
          category?: string | null
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: number
          created_at: string
        }
        Insert: {
          id?: number
          created_at?: string
        }
        Update: {
          id?: number
          created_at?: string
        }
      }
      conversation_participants: {
        Row: {
          conversation_id: number
          user_id: string
        }
        Insert: {
          conversation_id: number
          user_id: string
        }
        Update: {
          conversation_id?: number
          user_id?: string
        }
      }
      messages: {
        Row: {
          id: number
          conversation_id: number
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          conversation_id: number
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          conversation_id?: number
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
      farming_tips: {
        Row: {
          id: number
          title: string
          content: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_conversation_between_users: {
        Args: {
          user_id_1: string
          user_id_2: string
        }
        Returns: {
          conversation_id: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
