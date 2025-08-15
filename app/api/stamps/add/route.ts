import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { card_id, method } = await req.json();
  const cooldownHours = 0.25; // 15 minutes
  const cooldownSeconds = cooldownHours * 60 * 60; // 900 seconds (15 minutes)

  // Check for cooldown period
  const { data: lastStamp, error: lastError } = await supabase
    .from('stamps')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date().getTime();
  let rateLimitRemaining = 1;
  let rateLimitReset = Math.floor(now / 1000) + cooldownSeconds;

  if (lastStamp) {
    const last = new Date(lastStamp.created_at).getTime();
    const diff = (now - last) / (1000 * 60 * 60);
    
    if (diff < cooldownHours) {
      // In cooldown - calculate when reset occurs
      rateLimitRemaining = 0;
      rateLimitReset = Math.floor(last / 1000) + cooldownSeconds;
      
      const response = NextResponse.json({ 
        error: 'Cooldown not met', 
        remaining: Math.ceil(cooldownHours - diff) 
      }, { status: 429 });
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', '1');
      response.headers.set('X-RateLimit-Remaining', '0');
      response.headers.set('X-RateLimit-Reset', rateLimitReset.toString());
      
      return response;
    }
  }

  // Add new stamp
  const { data, error } = await supabase.from('stamps').insert({
    user_id: user.id,
    card_id,
    method: method || 'qr',
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Check for reward unlock
  const { data: stamps } = await supabase
    .from('stamps')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id);

  const stampCount = stamps?.length || 0;

  // Check if reward should be unlocked
  const { data: card } = await supabase
    .from('loyalty_cards')
    .select('stamp_requirement')
    .eq('id', card_id)
    .single();

  let reward_unlocked = false;
  if (card && stampCount >= card.stamp_requirement) {
    // Check if reward already exists
    const { data: existingReward } = await supabase
      .from('user_rewards')
      .select('*')
      .eq('user_id', user.id)
      .eq('card_id', card_id)
      .maybeSingle();

    if (!existingReward) {
      // Create unlocked reward
      await supabase.from('user_rewards').insert({
        user_id: user.id,
        card_id,
        reward_position: 1,
        status: 'unlocked',
        unlocked_at: new Date().toISOString(),
      });
      reward_unlocked = true;
    }
  }

  const response = NextResponse.json({ 
    success: true, 
    stamp: data, 
    total_stamps: stampCount,
    reward_unlocked 
  });

  // Add rate limit headers for successful request
  response.headers.set('X-RateLimit-Limit', '1');
  response.headers.set('X-RateLimit-Remaining', '0'); // Just used the 1 allowed request
  response.headers.set('X-RateLimit-Reset', (Math.floor(Date.now() / 1000) + cooldownSeconds).toString());

  return response;
}