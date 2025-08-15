// File: /api/challenges/complete.ts
import { createClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { challenge_id } = await req.json()

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if already completed
  const { data: userChallenge } = await supabase
    .from('user_challenges')
    .select('*')
    .eq('user_id', user.id)
    .eq('challenge_id', challenge_id)
    .single()

  if (!userChallenge || userChallenge.completed) {
    return NextResponse.json({ message: 'Challenge already completed or not found' }, { status: 400 })
  }

  // Mark challenge complete
  const { error: updateError } = await supabase
    .from('user_challenges')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
      points_awarded: true
    })
    .eq('id', userChallenge.id)

  // Insert into points log
  const { error: pointsError } = await supabase
    .from('points_log')
    .insert({
      user_id: user.id,
      action_type: 'challenge_complete',
      related_id: challenge_id,
      points: 10
    })

  if (updateError || pointsError) {
    return NextResponse.json({ error: 'Failed to complete challenge' }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: 'Challenge completed and points awarded' })
}