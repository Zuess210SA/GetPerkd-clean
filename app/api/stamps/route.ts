import { createClient } from '@/utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { card_id, business_id, method } = body

    // Add stamp to database
    const { data: stamp, error } = await supabase
      .from('stamps')
      .insert({
        user_id: user.id,
        card_id,
        business_id,
        method
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ stamp })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's stamps
    const { data: stamps, error } = await supabase
      .from('stamps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ stamps })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}