import { NextResponse } from 'next/server'
import { createClient } from '../../../../utils/supabase-server'
import { parse } from 'json2csv'
import { format } from 'date-fns'

export async function GET(req: Request) {
  const supabase = await createClient()

  const { searchParams } = new URL(req.url)
  const merchantId = searchParams.get('merchant_id')
  const campus = searchParams.get('campus')
  const fromDate = searchParams.get('from')
  const toDate = searchParams.get('to')

  let query = supabase
    .from('stamps')
    .select(
      'id, created_at, method, redeemed_by_staff, staff_pin, users(full_name,email), loyalty_cards(name,reward_title), businesses(name,category,campus,merchant_id)'
    )

  if (merchantId) query = query.eq('businesses.merchant_id', merchantId)
  if (campus) query = query.eq('businesses.campus', campus)
  if (fromDate) query = query.gte('created_at', fromDate)
  if (toDate) query = query.lte('created_at', toDate)

  const { data: stamps, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const formatted = (stamps || []).map((stamp: any) => ({
    id: stamp.id,
    date: stamp.created_at,
    method: stamp.method,
    user_name: stamp.users?.full_name ?? 'N/A',
    user_email: stamp.users?.email ?? 'N/A',
    card_name: stamp.loyalty_cards?.name ?? 'N/A',
    reward_title: stamp.loyalty_cards?.reward_title ?? 'N/A',
    business_name: stamp.businesses?.name ?? 'N/A',
    business_category: stamp.businesses?.category ?? 'N/A',
    campus: stamp.businesses?.campus ?? 'N/A',
    merchant_id: stamp.businesses?.merchant_id ?? 'N/A',
    redeemed_by_staff: stamp.redeemed_by_staff ?? false,
    staff_pin: stamp.staff_pin ?? ''
  }))

  const csv = parse(formatted, {
    fields: [
      'id',
      'date',
      'method',
      'user_name',
      'user_email',
      'card_name',
      'reward_title',
      'business_name',
      'business_category',
      'campus',
      'merchant_id',
      'redeemed_by_staff',
      'staff_pin'
    ]
  })

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=perk_redemptions_${format(
        new Date(),
        'yyyy-MM-dd'
      )}.csv`
    }
  })
}
