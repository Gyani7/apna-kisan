export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      advertisements: {
        Row: {
          ad_image_url: string
          advertiser_name: string
          created_at: string | null
          end_date: string
          id: string
          start_date: string
          target_url: string
        }
        Insert: {
          ad_image_url: string
          advertiser_name: string
          created_at?: string | null
          end_date: string
          id?: string
          start_date: string
          target_url: string
        }
        Update: {
          ad_image_url?: string
          advertiser_name?: string
          created_at?: string | null
          end_date?: string
          id?: string
          start_date?: string
          target_url?: string
        }
        Relationships: []
      }
      advisories: {
        Row: {
          content: string
          created_at: string | null
          crop_type: string | null
          id: string
          region: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          crop_type?: string | null
          id?: string
          region?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          crop_type?: string | null
          id?: string
          region?: string | null
          title?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          admin_id: string
          content: string | null
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string | null
          title: string
        }
        Insert: {
          admin_id: string
          content?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
        }
        Update: {
          admin_id?: string
          content?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answer_votes: {
        Row: {
          answer_id: string
          created_at: string | null
          id: string
          user_id: string
          vote_type: number
        }
        Insert: {
          answer_id: string
          created_at?: string | null
          id?: string
          user_id: string
          vote_type: number
        }
        Update: {
          answer_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
          vote_type?: number
        }
        Relationships: [
          {
            foreignKeyName: "answer_votes_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answers: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          guest_mobile: string | null
          guest_name: string | null
          id: string
          is_best_answer: boolean | null
          question_id: string
          status: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          guest_mobile?: string | null
          guest_name?: string | null
          id?: string
          is_best_answer?: boolean | null
          question_id: string
          status?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          guest_mobile?: string | null
          guest_name?: string | null
          id?: string
          is_best_answer?: boolean | null
          question_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      blocks: {
        Row: {
          district_id: number
          id: number
          name: string
          slug: string
        }
        Insert: {
          district_id: number
          id?: number
          name: string
          slug: string
        }
        Update: {
          district_id?: number
          id?: number
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocks_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          cart_id: string
          id?: string
          product_id: string
          quantity: number
        }
        Update: {
          cart_id?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          id: string
          user_id: string
        }
        Insert: {
          id?: string
          user_id: string
        }
        Update: {
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          chat_id: string
          created_at: string | null
          id: string
          message_text: string
          sender_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string | null
          id?: string
          message_text: string
          sender_id: string
        }
        Update: {
          chat_id?: string
          created_at?: string | null
          id?: string
          message_text?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          chat_id: string
          id: string
          user_id: string
        }
        Insert: {
          chat_id: string
          id?: string
          user_id: string
        }
        Update: {
          chat_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment: string
          created_at: string | null
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_questions: {
        Row: {
          category: string
          created_at: string | null
          embedding: string | null
          guest_mobile: string | null
          guest_name: string | null
          id: string
          mobile: string | null
          name: string
          question: string
          state: string
          status: string
        }
        Insert: {
          category: string
          created_at?: string | null
          embedding?: string | null
          guest_mobile?: string | null
          guest_name?: string | null
          id?: string
          mobile?: string | null
          name: string
          question: string
          state: string
          status?: string
        }
        Update: {
          category?: string
          created_at?: string | null
          embedding?: string | null
          guest_mobile?: string | null
          guest_name?: string | null
          id?: string
          mobile?: string | null
          name?: string
          question?: string
          state?: string
          status?: string
        }
        Relationships: []
      }
      crop_disease_detections: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          disease_name: string | null
          id: string
          image_url: string
          recommendations: string[] | null
          status: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          disease_name?: string | null
          id?: string
          image_url: string
          recommendations?: string[] | null
          status?: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          disease_name?: string | null
          id?: string
          image_url?: string
          recommendations?: string[] | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crop_disease_detections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_health_analysis: {
        Row: {
          analysis_payload: Json | null
          analysis_provider: string | null
          confidence_score: number | null
          created_at: string
          detected_disease: string | null
          guest_id: string | null
          id: string
          image_url: string
          recommendations: string[] | null
          status: string
          user_id: string | null
        }
        Insert: {
          analysis_payload?: Json | null
          analysis_provider?: string | null
          confidence_score?: number | null
          created_at?: string
          detected_disease?: string | null
          guest_id?: string | null
          id?: string
          image_url: string
          recommendations?: string[] | null
          status?: string
          user_id?: string | null
        }
        Update: {
          analysis_payload?: Json | null
          analysis_provider?: string | null
          confidence_score?: number | null
          created_at?: string
          detected_disease?: string | null
          guest_id?: string | null
          id?: string
          image_url?: string
          recommendations?: string[] | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_health_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          id: number
          name: string
          slug: string
          state_id: number
        }
        Insert: {
          id?: number
          name: string
          slug: string
          state_id: number
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          state_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "districts_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      farming_tips: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          slug: string | null
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: never
          slug?: string | null
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: never
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      featured_listings: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          product_id: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          product_id: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          product_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "featured_listings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      finances: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          transaction_date: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_date?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_date?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: never
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: never
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          application_link: string | null
          benefits: string[] | null
          created_at: string
          description: string
          eligibility_criteria: Json
          id: string
          is_active: boolean | null
          scheme_name: string
        }
        Insert: {
          application_link?: string | null
          benefits?: string[] | null
          created_at?: string
          description: string
          eligibility_criteria: Json
          id?: string
          is_active?: boolean | null
          scheme_name: string
        }
        Update: {
          application_link?: string | null
          benefits?: string[] | null
          created_at?: string
          description?: string
          eligibility_criteria?: Json
          id?: string
          is_active?: boolean | null
          scheme_name?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string | null
          id: string
          name: string
          quantity: number
          unit: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          quantity: number
          unit?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          quantity?: number
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_verifications: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          reviewed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          reviewed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          reviewed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          bank_name: string
          id: string
          interest_rate: number | null
          loan_type: string
          max_amount: number | null
          processing_fee: number | null
        }
        Insert: {
          bank_name: string
          id?: string
          interest_rate?: number | null
          loan_type: string
          max_amount?: number | null
          processing_fee?: number | null
        }
        Update: {
          bank_name?: string
          id?: string
          interest_rate?: number | null
          loan_type?: string
          max_amount?: number | null
          processing_fee?: number | null
        }
        Relationships: []
      }
      mandi_rates: {
        Row: {
          crop_name: string
          id: number
          mandi_id: string
          max_price: number
          min_price: number
          modal_price: number
          reported_at: string
        }
        Insert: {
          crop_name: string
          id?: number
          mandi_id: string
          max_price: number
          min_price: number
          modal_price: number
          reported_at?: string
        }
        Update: {
          crop_name?: string
          id?: number
          mandi_id?: string
          max_price?: number
          min_price?: number
          modal_price?: number
          reported_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mandi_rates_mandi_id_fkey"
            columns: ["mandi_id"]
            isOneToOne: false
            referencedRelation: "mandis"
            referencedColumns: ["id"]
          },
        ]
      }
      mandis: {
        Row: {
          district_id: number
          id: string
          name: string
        }
        Insert: {
          district_id: number
          id?: string
          name: string
        }
        Update: {
          district_id?: number
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "mandis_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string | null
          id: string
          status: string
          total_price: number
        }
        Insert: {
          buyer_id: string
          created_at?: string | null
          id?: string
          status?: string
          total_price: number
        }
        Update: {
          buyer_id?: string
          created_at?: string | null
          id?: string
          status?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          image_url: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: never
          image_url?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: never
          image_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_urls: string[] | null
          is_featured: boolean | null
          price: number
          seller_id: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          price: number
          seller_id: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          price?: number
          seller_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          farmer_level: string | null
          full_name: string | null
          id: string
          is_verified: boolean
          location: string | null
          premium: boolean | null
          reputation_points: number
          role: string
          role_id: number | null
          username: string | null
          village_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          farmer_level?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean
          location?: string | null
          premium?: boolean | null
          reputation_points?: number
          role?: string
          role_id?: number | null
          username?: string | null
          village_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          farmer_level?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean
          location?: string | null
          premium?: boolean | null
          reputation_points?: number
          role?: string
          role_id?: number | null
          username?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reel_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          reel_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          reel_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          reel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reel_comments_reel_id_fkey"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "reels"
            referencedColumns: ["id"]
          },
        ]
      }
      reel_likes: {
        Row: {
          created_at: string
          reel_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          reel_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          reel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reel_likes_reel_id_fkey"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "reels"
            referencedColumns: ["id"]
          },
        ]
      }
      reels: {
        Row: {
          caption: string | null
          comments_count: number | null
          created_at: string | null
          id: string
          likes_count: number | null
          thumbnail_url: string | null
          user_id: string
          video_url: string
        }
        Insert: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          id?: string
          likes_count?: number | null
          thumbnail_url?: string | null
          user_id: string
          video_url: string
        }
        Update: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          id?: string
          likes_count?: number | null
          thumbnail_url?: string | null
          user_id?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "reels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          name: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          id?: number
          name: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          id?: number
          name?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      schemes: {
        Row: {
          benefits: string | null
          description: string | null
          eligibility: string | null
          id: string
          link: string | null
          name: string
        }
        Insert: {
          benefits?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          link?: string | null
          name: string
        }
        Update: {
          benefits?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          link?: string | null
          name?: string
        }
        Relationships: []
      }
      states: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: number
          media_url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: never
          media_url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: never
          media_url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      story_views: {
        Row: {
          id: number
          story_id: number | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: never
          story_id?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: never
          story_id?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_views_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          plan_type: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          plan_type: string
          start_date: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          plan_type?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string | null
          id: string
          name: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_scheme_matches: {
        Row: {
          id: string
          is_eligible: boolean | null
          match_score: number
          matched_at: string
          scheme_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_eligible?: boolean | null
          match_score: number
          matched_at?: string
          scheme_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_eligible?: boolean | null
          match_score?: number
          matched_at?: string
          scheme_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_scheme_matches_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "government_schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_scheme_matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          created_at: string
          document_type: string
          document_url: string
          id: string
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          document_url: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          document_url?: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      villages: {
        Row: {
          block_id: number
          created_at: string
          id: string
          name: string
          nearby_mandi_id: string | null
          primary_crops: string[] | null
          slug: string
        }
        Insert: {
          block_id: number
          created_at?: string
          id?: string
          name: string
          nearby_mandi_id?: string | null
          primary_crops?: string[] | null
          slug: string
        }
        Update: {
          block_id?: number
          created_at?: string
          id?: string
          name?: string
          nearby_mandi_id?: string | null
          primary_crops?: string[] | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_nearby_mandi"
            columns: ["nearby_mandi_id"]
            isOneToOne: false
            referencedRelation: "mandis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villages_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      weather_data: {
        Row: {
          data: Json
          id: string
          location: string
          updated_at: string | null
        }
        Insert: {
          data: Json
          id?: string
          location: string
          updated_at?: string | null
        }
        Update: {
          data?: Json
          id?: string
          location?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          id: string
          product_id: string
          wishlist_id: string
        }
        Insert: {
          id?: string
          product_id: string
          wishlist_id: string
        }
        Update: {
          id?: string
          product_id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
        }
        Insert: {
          id?: string
          user_id: string
        }
        Update: {
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_reel_comment: {
        Args: { p_content: string; p_reel_id: string; p_user_id: string }
        Returns: undefined
      }
      calculate_farmer_level: { Args: { points: number }; Returns: string }
      delete_old_stories: { Args: never; Returns: undefined }
      get_feed_item_ids: {
        Args: { page_number: number; page_size: number }
        Returns: {
          created_at: string
          id: string
          is_featured: boolean
          type: string
        }[]
      }
      get_village_farmer_count: { Args: { v_id: string }; Returns: number }
      increment_reputation: {
        Args: { points_to_add: number; target_user_id: string }
        Returns: undefined
      }
      is_admin: { Args: { user_id: string }; Returns: boolean }
      match_questions: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
          user_state: string
        }
        Returns: {
          id: string
          question: string
          similarity: number
          state: string
        }[]
      }
      toggle_reel_like: {
        Args: { p_reel_id: string; p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      user_role: "super_admin" | "admin" | "farmer" | "buyer" | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role: ["super_admin", "admin", "farmer", "buyer", "expert"],
    },
  },
} as const
