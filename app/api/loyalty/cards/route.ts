import { createClient } from '../../../../utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get user from database to get integer ID
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', user.email)
      .single()

    if (userError || !dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all active loyalty cards with user's stamp progress
    const { data: loyaltyCards, error: cardsError } = await supabase
      .from('loyalty_cards')
      .select(`
        *,
        businesses!inner(name, image_url)
      `)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (cardsError) {
      console.error('Error fetching loyalty cards:', cardsError)
      return NextResponse.json({ error: 'Failed to fetch loyalty cards' }, { status: 500 })
    }

    // Get stamp counts for each card for this user
    const cardsWithProgress = await Promise.all(
      loyaltyCards.map(async (card) => {
        // Get stamp count for this user and card
        const { count: stampCount } = await supabase
          .from('stamps')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', dbUser.id)
          .eq('card_id', card.id)

        // Get last stamp date
        const { data: lastStamp } = await supabase
          .from('stamps')
          .select('created_at')
          .eq('user_id', dbUser.id)
          .eq('card_id', card.id)
          .order('created_at', { ascending: false })
          .limit(1)

        // Get user's rewards for this card
        const { data: rewards } = await supabase
          .from('user_rewards')
          .select('*')
          .eq('user_id', dbUser.id)
          .eq('card_id', card.id)

        const userStamps = stampCount || 0
        const isCompleted = userStamps >= card.stamps_required
        const nextRewardAt = card.stamps_required

        return {
          ...card,
          user_stamps: userStamps,
          business_name: card.businesses.name,
          business_image: card.businesses.image_url,
          last_stamp_date: lastStamp?.[0]?.created_at || null,
          next_reward_at: nextRewardAt,
          is_completed: isCompleted,
          rewards: rewards || []
        }
      })
    )

    // Sort by user engagement (cards with stamps first, then by recent activity)
    cardsWithProgress.sort((a, b) => {
      if (a.user_stamps > 0 && b.user_stamps === 0) return -1
      if (a.user_stamps === 0 && b.user_stamps > 0) return 1
      if (a.last_stamp_date && b.last_stamp_date) {
        return new Date(b.last_stamp_date).getTime() - new Date(a.last_stamp_date).getTime()
      }
      return 0
    })

    return NextResponse.json({
      cards: cardsWithProgress,
      total_cards: cardsWithProgress.length,
      active_cards: cardsWithProgress.filter(card => card.user_stamps > 0).length,
      completed_cards: cardsWithProgress.filter(card => card.is_completed).length
    })

  } catch (error) {
    console.error('Error in loyalty cards API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}