// Phase 3 Loyalty System Types
export interface LoyaltyCard {
  id: number
  business_id: number
  name: string
  description: string | null
  stamps_required: number
  reward_title: string | null
  reward_description: string | null
  active: boolean
  created_at: string
  updated_at: string
}

export interface Stamp {
  id: number
  user_id: number
  card_id: number
  business_id: number
  method: 'qr' | 'pin'
  staff_id: number | null
  created_at: string
}

export interface UserReward {
  id: number
  user_id: number
  card_id: number
  reward_position: number
  status: 'locked' | 'unlocked' | 'redeemed'
  unlocked_at: string | null
  redeemed_at: string | null
  business_id: number | null
  expires_at: string | null
}

export interface StaffPin {
  id: number
  staff_id: number | null
  business_id: number
  pin_code: string
  active: boolean
  created_at: string
}

export interface StampCardWithProgress extends LoyaltyCard {
  user_stamps: number
  business_name: string
  last_stamp_date: string | null
  next_reward_at: number
  is_completed: boolean
}

export interface AddStampRequest {
  card_id: number
  method: 'qr' | 'pin'
  pin_code?: string
}

export interface AddStampResponse {
  success: boolean
  stamp?: Stamp
  new_stamp_count: number
  reward_unlocked: boolean
  reward_id?: number
  message: string
  cooldown_expires?: string
}