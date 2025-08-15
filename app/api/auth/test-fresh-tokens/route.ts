import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase-server'

export async function GET(request: NextRequest) {
  console.log('[AUTH TEST] Testing fresh token generation')
  
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return NextResponse.json({
        success: false,
        message: 'No valid session found',
        error: error?.message
      }, { status: 401 })
    }
    
    // Log token details for debugging (first 10 chars only for security)
    const tokenInfo = {
      hasAccessToken: !!session.access_token,
      hasRefreshToken: !!session.refresh_token,
      accessTokenHash: session.access_token?.substring(0, 10) + '...',
      refreshTokenHash: session.refresh_token?.substring(0, 10) + '...',
      expiresAt: session.expires_at,
      tokenGenerated: new Date(session.expires_at ? session.expires_at * 1000 : 0).toISOString()
    }
    
    console.log('[AUTH TEST] Current token info:', tokenInfo)
    
    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email
      },
      tokenInfo,
      message: 'Fresh tokens verified'
    })
    
  } catch (error: any) {
    console.error('[AUTH TEST] Error:', error.message)
    return NextResponse.json({
      success: false,
      message: 'Auth test failed',
      error: error.message
    }, { status: 500 })
  }
}