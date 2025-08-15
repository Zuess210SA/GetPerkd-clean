
import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { user } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { reward_id } = await req.json();

  // Check if reward is unlocked and not yet redeemed
  const { data: reward, error: rewardError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('user_id', user.id)
    .eq('reward_id', reward_id)
    .single();

  if (rewardError || !reward) {
    return NextResponse.json({ error: 'Reward not unlocked' }, { status: 404 });
  }

  if (reward.status === 'redeemed') {
    return NextResponse.json({ error: 'Reward already redeemed' }, { status: 409 });
  }

  // Mark reward as redeemed
  const { data: updated, error: updateError } = await supabase
    .from('user_rewards')
    .update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('reward_id', reward_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ redeemed: true });
}
