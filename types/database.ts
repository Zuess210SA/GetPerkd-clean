export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          full_name: string
          university: string
          campus_id: string | null
          student_id: string | null
          is_business_owner: boolean
          role: string
          campus_member_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          full_name: string
          university: string
          campus_id?: string | null
          student_id?: string | null
          is_business_owner?: boolean
          role?: string
          campus_member_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          full_name?: string
          university?: string
          campus_id?: string | null
          student_id?: string | null
          is_business_owner?: boolean
          role?: string
          campus_member_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      deals: {
        Row: {
          id: number
          business_id: number
          title_en: string
          title_es: string | null
          description_en: string
          description_es: string | null
          category: string
          discount_percentage: number
          original_price: number | null
          discounted_price: number | null
          expires_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          business_id: number
          title_en: string
          title_es?: string | null
          description_en: string
          description_es?: string | null
          category: string
          discount_percentage: number
          original_price?: number | null
          discounted_price?: number | null
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          business_id?: number
          title_en?: string
          title_es?: string | null
          description_en?: string
          description_es?: string | null
          category?: string
          discount_percentage?: number
          original_price?: number | null
          discounted_price?: number | null
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      businesses: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          address: string
          description: string
          category: string
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone: string
          address: string
          description: string
          category: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string
          address?: string
          description?: string
          category?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
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