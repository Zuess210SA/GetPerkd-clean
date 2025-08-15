import { NextResponse } from 'next/server'

export async function GET() {
  const buildInfo = {
    timestamp: new Date().toISOString(),
    buildHash: process.env.REPLIT_DEPLOYMENT_ID || 'local-dev',
    version: '1.0.0',
    features: {
      sessionStorage: true,
      tokenRotation: true,
      freshLogging: true
    },
    environment: process.env.NODE_ENV || 'development',
    supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }

  return NextResponse.json({
    status: 'healthy',
    message: 'Supabase Token Rotation Fix - Build Deployed',
    buildInfo,
    timestamp: new Date().toISOString()
  })
}