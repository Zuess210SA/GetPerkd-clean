
import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { user } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { card_id, method } = await req.json();
  const cooldownHours = 6;

  const { data: lastStamp, error: lastError } = await supabase
    .from('stamps')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (lastStamp) {
    const now = new Date().getTime();
    const last = new Date(lastStamp.timestamp).getTime();
    const diff = (now - last) / (1000 * 60 * 60);
    if (diff < cooldownHours) {
      return NextResponse.json({ error: 'Cooldown not met' }, { status: 429 });
    }
  }

  const { data, error } = await supabase.from('stamps').insert({
    user_id: user.id,
    card_id,
    method: method || 'qr',
    timestamp: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, stamp: data });
}
