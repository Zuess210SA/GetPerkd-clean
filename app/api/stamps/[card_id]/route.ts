import { createClient } from '../../../../utils/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

// QR Code redemption endpoint - GET /api/stamps/[card_id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ card_id: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get user from database to get integer ID
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', user.email)
      .single()

    if (userError || !dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { card_id } = await params
    const cardId = parseInt(card_id)
    if (isNaN(cardId)) {
      return NextResponse.json({ error: 'Invalid card ID' }, { status: 400 })
    }

    // Add stamp via QR method
    const addStampResponse = await fetch(`${request.nextUrl.origin}/api/stamps/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      },
      body: JSON.stringify({
        card_id: cardId,
        method: 'qr'
      })
    })

    const result = await addStampResponse.json()

    if (!addStampResponse.ok) {
      const errorResponse = NextResponse.json(result, { status: addStampResponse.status })
      // Forward rate limit headers from underlying call
      const rateLimitHeaders = ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
      rateLimitHeaders.forEach(header => {
        const value = addStampResponse.headers.get(header)
        if (value) errorResponse.headers.set(header, value)
      })
      return errorResponse
    }

    const successResponse = NextResponse.json(result)
    // Forward rate limit headers from underlying call
    const rateLimitHeaders = ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
    rateLimitHeaders.forEach(header => {
      const value = addStampResponse.headers.get(header)
      if (value) successResponse.headers.set(header, value)
    })
    
    return successResponse

  } catch (error) {
    console.error('Error in QR stamp redemption:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}