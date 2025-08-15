
import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { user } = await supabase.auth.getUser();

  if (!user) {
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

  const stampCount = stamps.length;

  // Fetch matching reward
  const { data: reward, error: rewardError } = await supabase
    .from('rewards')
    .select('*')
    .eq('card_id', card_id)
    .eq('position', stampCount)
    .single();

  if (rewardError || !reward) {
    return NextResponse.json({ unlocked: false });
  }

  // Check if already unlocked
  const { data: existing, error: existsError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('user_id', user.id)
    .eq('reward_id', reward.id)
    .single();

  if (existing) {
    return NextResponse.json({ unlocked: false, message: 'Already unlocked' });
  }

  // Unlock reward
  const { data: unlock, error: unlockError } = await supabase
    .from('user_rewards')
    .insert({
      user_id: user.id,
      reward_id: reward.id,
      status: 'unlocked',
      timestamp: new Date().toISOString(),
    });

  if (unlockError) {
    return NextResponse.json({ error: unlockError.message }, { status: 500 });
  }

  return NextResponse.json({ unlocked: true, reward: reward });
}
