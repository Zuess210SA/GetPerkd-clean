export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          username: string
          email: string
          full_name: string
          university: string
          student_id: string | null
          is_business_owner: boolean
          created_at: string
        }
        Insert: {
          id?: number
          username: string
          email: string
          full_name: string
          university: string
          student_id?: string | null
          is_business_owner?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          username?: string
          email?: string
          full_name?: string
          university?: string
          student_id?: string | null
          is_business_owner?: boolean
          created_at?: string
        }
      }
      businesses: {
        Row: {
          id: number
          owner_id: number | null
          name: string
          description: string | null
          address: string
          phone: string | null
          email: string | null
          category: string
          image_url: string | null
          verified: boolean
          is_test: boolean
          created_at: string
        }
        Insert: {
          id?: number
          owner_id?: number | null
          name: string
          description?: string | null
          address: string
          phone?: string | null
          email?: string | null
          category: string
          image_url?: string | null
          verified?: boolean
          is_test?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          owner_id?: number | null
          name?: string
          description?: string | null
          address?: string
          phone?: string | null
          email?: string | null
          category?: string
          image_url?: string | null
          verified?: boolean
          is_test?: boolean
          created_at?: string
        }
      }
      loyalty_cards: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          stamp_requirement: number
          reward_description: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          stamp_requirement?: number
          reward_description: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          stamp_requirement?: number
          reward_description?: string
          is_active?: boolean
          created_at?: string
        }
      }
      stamps: {
        Row: {
          id: string
          user_id: string
          card_id: string
          business_id: string
          method: string
          staff_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          card_id: string
          business_id: string
          method: string
          staff_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          card_id?: string
          business_id?: string
          method?: string
          staff_id?: string | null
          created_at?: string
        }
      }
      user_rewards: {
        Row: {
          id: string
          user_id: string
          card_id: string
          reward_position: number
          status: string
          unlocked_at: string | null
          redeemed_at: string | null
          business_id: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          card_id: string
          reward_position: number
          status?: string
          unlocked_at?: string | null
          redeemed_at?: string | null
          business_id?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          card_id?: string
          reward_position?: number
          status?: string
          unlocked_at?: string | null
          redeemed_at?: string | null
          business_id?: string | null
          expires_at?: string | null
        }
      }
      deals: {
        Row: {
          id: number
          business_id: number | null
          title: string
          description: string
          discount_percent: number | null
          discount_amount: string | null
          category: string
          valid_until: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          business_id?: number | null
          title: string
          description: string
          discount_percent?: number | null
          discount_amount?: string | null
          category: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          business_id?: number | null
          title?: string
          description?: string
          discount_percent?: number | null
          discount_amount?: string | null
          category?: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
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
  }
}