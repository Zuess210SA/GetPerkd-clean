import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { business_id, start_date, end_date } = await req.json();

  // Validate business ownership/access
  const { data: business } = await supabase
    .from('businesses')
    .select('owner_id')
    .eq('id', business_id)
    .single();

  if (!business || business.owner_id !== user.id) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Fetch stamps count
  const { data: stamps, error: stampError } = await supabase
    .from('stamps')
    .select('*')
    .eq('business_id', business_id)
    .gte('created_at', start_date)
    .lte('created_at', end_date);

  // Fetch rewards unlocked
  const { data: unlocked, error: unlockedError } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('business_id', business_id)
    .eq('status', 'unlocked')
    .gte('unlocked_at', start_date)
    .lte('unlocked_at', end_date);

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
    business_id,
    date_range: { start_date, end_date },
    metrics: {
      stamps_earned: stamps?.length || 0,
      rewards_unlocked: unlocked?.length || 0,
      rewards_redeemed: redeemed?.length || 0,
      engagement_rate: stamps?.length ? (unlocked?.length || 0) / stamps.length : 0,
      redemption_rate: unlocked?.length ? (redeemed?.length || 0) / unlocked.length : 0,
    },
    raw_data: {
      stamps: stamps || [],
      unlocked: unlocked || [],
      redeemed: redeemed || [],
    }
  });
}