// File: /api/leaderboard/get.ts
import { createClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user's campus_id (assumes stored in profile or user_metadata)
  const { data: profile } = await supabase
    .from('profiles')
    .select('campus_id')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.campus_id) {
    return NextResponse.json({ error: 'Campus not found' }, { status: 400 })
  }

  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday as start

  const { data: topUsers } = await supabase
    .from('leaderboard_snapshots')
    .select('user_id, total_points, rank')
    .eq('campus_id', profile.campus_id)
    .eq('week_start', startOfWeek.toISOString().split('T')[0])
    .order('rank', { ascending: true })
    .limit(10)

  return NextResponse.json({ leaderboard: topUsers || [] })
}