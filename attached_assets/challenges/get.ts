// File: /api/challenges/get.ts
import { createClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: challenges } = await supabase
    .from('challenges')
    .select('*')
    .eq('active', true)

  const { data: userProgress } = await supabase
    .from('user_challenges')
    .select('challenge_id, progress, completed')
    .eq('user_id', user.id)

  return NextResponse.json({ challenges, userProgress })
}