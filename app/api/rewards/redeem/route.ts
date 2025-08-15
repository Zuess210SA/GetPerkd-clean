import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { reward_id } = await req.json();

  // Get the reward
  const { data: reward, error: rewardError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('id', reward_id)
    .eq('user_id', user.id)
    .single();

  if (rewardError || !reward) {
    return NextResponse.json({ error: 'Reward not found' }, { status: 404 });
  }

  if (reward.status !== 'unlocked') {
    const response = NextResponse.json({ error: 'Reward not available for redemption' }, { status: 400 });
    // Add rate limit headers for already used reward
    response.headers.set('X-RateLimit-Limit', '1');
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set('X-RateLimit-Reset', 'never');
    return response;
  }

  // Check if expired
  if (reward.expires_at && new Date() > new Date(reward.expires_at)) {
    return NextResponse.json({ error: 'Reward has expired' }, { status: 400 });
  }

  // Mark as redeemed
  const { data: updatedReward, error: updateError } = await supabase
    .from('user_rewards')
    .update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
    })
    .eq('id', reward_id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const response = NextResponse.json({ 
    success: true, 
    reward: updatedReward,
    message: 'Reward redeemed successfully!'
  });

  // Add rate limit headers for reward redemption
  // Each reward can only be redeemed once, so limit is 1 with no reset
  response.headers.set('X-RateLimit-Limit', '1');
  response.headers.set('X-RateLimit-Remaining', '0'); // Used the only allowed redemption
  response.headers.set('X-RateLimit-Reset', 'never'); // Rewards don't reset once redeemed

  return response;
}