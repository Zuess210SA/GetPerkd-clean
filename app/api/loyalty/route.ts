import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get loyalty cards with business information and user progress
    const { data: loyaltyCards, error: cardsError } = await supabase
      .from('loyalty_cards')
      .select(`
        id,
        name,
        description,
        stamp_requirement,
        reward_title,
        reward_description,
        is_active,
        businesses (
          id,
          name,
          category
        )
      `)
      .eq('is_active', true);

    if (cardsError) {
      return NextResponse.json({ error: cardsError.message }, { status: 500 });
    }

    // For each card, get user's stamp count and reward status
    const cardsWithProgress = await Promise.all(
      (loyaltyCards || []).map(async (card) => {
        // Get user's stamps for this card
        const { data: stamps } = await supabase
          .from('stamps')
          .select('id')
          .eq('user_id', user.id)
          .eq('card_id', card.id);

        // Get user's reward status for this card
        const { data: userReward } = await supabase
          .from('user_rewards')
          .select('status, unlocked_at, redeemed_at')
          .eq('user_id', user.id)
          .eq('card_id', card.id)
          .maybeSingle();

        return {
          id: card.id,
          business_name: card.businesses?.name || 'Unknown Business',
          name: card.name,
          description: card.description,
          stamp_requirement: card.stamp_requirement,
          reward_title: card.reward_title,
          reward_description: card.reward_description,
          current_stamps: stamps?.length || 0,
          is_active: card.is_active,
          user_reward_status: userReward?.status || 'locked',
          unlocked_at: userReward?.unlocked_at,
          redeemed_at: userReward?.redeemed_at,
        };
      })
    );

    return NextResponse.json({
      success: true,
      cards: cardsWithProgress,
      total_cards: cardsWithProgress.length,
    });
  } catch (error) {
    console.error('Error fetching loyalty cards:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}