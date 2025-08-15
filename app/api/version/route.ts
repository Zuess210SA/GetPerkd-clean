import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    version: '2.0.0-token-rotation-fix',
    deployedAt: new Date().toISOString(),
    features: [
      'FORCED sessionStorage configuration',
      'Nuclear session cleanup on login/logout', 
      'Fresh token generation with logging',
      'Disabled token caching and persistence',
      'Auth-aware query hooks with delays'
    ],
    buildId: process.env.REPLIT_DEPLOYMENT_ID || 'dev-build',
    storageMode: 'sessionStorage',
    authSystem: 'supabase-v2-token-rotation'
  })
}