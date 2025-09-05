
import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { user } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { business_id, start_date, end_date } = await req.json();

  // Fetch stamps count
  const { data: stamps, error: stampError } = await supabase
    .from('stamps')
    .select('*')
    .eq('business_id', business_id)
    .gte('timestamp', start_date)
    .lte('timestamp', end_date);

  // Fetch rewards unlocked
  const { data: unlocked, error: unlockedError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('business_id', business_id)
    .eq('status', 'unlocked')
    .gte('timestamp', start_date)
    .lte('timestamp', end_date);

  // Fetch rewards redeemed
  const { data: redeemed, error: redeemedError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('business_id', business_id)
    .eq('status', 'redeemed')
    .gte('redeemed_at', start_date)
    .lte('redeemed_at', end_date);

  // Error handling
  if (stampError || unlockedError || redeemedError) {
    return NextResponse.json({ error: 'Error fetching analytics' }, { status: 500 });
  }

  return NextResponse.json({
    stamps: stamps.length,
    rewards_unlocked: unlocked.length,
    rewards_redeemed: redeemed.length,
  });
}
