
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
      posts: {
        Row: {
          id: number
          created_at: string
          title: string
          content: string
          user_id: string
          post_type: string
          slug: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          content: string
          user_id: string
          post_type: string
          slug: string
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          content?: string
          user_id?: string
          post_type?: string
          slug?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          product_id: number
          quantity: number
        }
        Insert: {
          id?: number
          user_id: string
          product_id: number
          quantity: number
        }
        Update: {
          id?: number
          user_id?: string
          product_id?: number
          quantity?: number
        }
      }
      products: {
        Row: {
          id: number
          title: string
          description: string
          price: number
          stock: number
          category: string
          image_url: string
          farmer_id: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          price: number
          stock: number
          category: string
          image_url: string
          farmer_id: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          price?: number
          stock?: number
          category?: string
          image_url?: string
          farmer_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
