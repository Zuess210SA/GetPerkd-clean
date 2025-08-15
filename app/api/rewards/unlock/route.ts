import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { card_id } = await req.json();

  // Count stamps for this user on this card
  const { data: stamps, error: stampsError } = await supabase
    .from('stamps')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id);

  if (stampsError) {
    return NextResponse.json({ error: stampsError.message }, { status: 500 });
  }

  const stampCount = stamps?.length || 0;

  // Get card requirements
  const { data: card, error: cardError } = await supabase
    .from('loyalty_cards')
    .select('stamp_requirement, reward_title, reward_description')
    .eq('id', card_id)
    .single();

  if (cardError || !card) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  // Check if stamps meet requirement
  if (stampCount < card.stamp_requirement) {
    return NextResponse.json({ 
      unlocked: false, 
      stamps_needed: card.stamp_requirement - stampCount 
    });
  }

  // Check if already unlocked
  const { data: existing } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ 
      unlocked: false, 
      message: 'Already unlocked',
      status: existing.status 
    });
  }

  // Unlock reward
  const { data: unlock, error: unlockError } = await supabase
    .from('user_rewards')
    .insert({
      user_id: user.id,
      card_id,
      reward_position: 1,
      status: 'unlocked',
      unlocked_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (unlockError) {
    return NextResponse.json({ error: unlockError.message }, { status: 500 });
  }

  return NextResponse.json({ 
    unlocked: true, 
    reward: {
      id: unlock.id,
      title: card.reward_title,
      description: card.reward_description,
      position: unlock.reward_position,
      status: unlock.status
    }
  });
}