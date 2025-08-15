import { createClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

// Track failed attempts to prevent API flooding
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 3;
const THROTTLE_DURATION = 60000; // 1 minute

// Authentication endpoint with comprehensive logging
export async function GET(req: NextRequest) {
  try {
    // Get client IP for throttling
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || 'direct';
    
    // LOG ALL CALLS FOR DEBUGGING
    console.log(`[USER/ME] Called by IP: ${clientIP}, User-Agent: ${userAgent.slice(0, 50)}, Referer: ${referer}`);
    
    // Check authorization header first
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(`[USER/ME] No auth header provided from ${clientIP}`);
      return NextResponse.json({ 
        authenticated: false, 
        user: null,
        message: 'No authentication provided'
      });
    }

    // Check for throttling (REDUCED TO 1 REQUEST PER 30 SECONDS)
    const attempts = failedAttempts.get(clientIP);
    if (attempts && attempts.count >= 1) { // Only allow 1 request
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < 30000) { // 30 second cooldown
        console.log(`[USER/ME] THROTTLED: ${clientIP} - ${attempts.count} attempts, last attempt ${timeSinceLastAttempt}ms ago`);
        return new Response("Too many requests. Please wait 30 seconds.", { status: 429 });
      } else {
        // Reset attempts after throttle duration
        failedAttempts.delete(clientIP);
      }
    }

    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log(`[USER/ME] Auth failed for ${clientIP}: ${userError?.message || 'No user'}`);
      // Track failed attempt  
      const currentAttempts = failedAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      failedAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: Date.now()
      });

      return NextResponse.json({ 
        authenticated: false, 
        user: null,
        message: 'Invalid or expired token'
      }, { status: 401 });
    }

    // Clear failed attempts on success
    failedAttempts.delete(clientIP);
    console.log(`[USER/ME] SUCCESS for ${clientIP} - User: ${user.email}`);

    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata
      }
    });

  } catch (error) {
    console.error('Error in /api/user/me:', error);
    return NextResponse.json({ 
      authenticated: false, 
      user: null,
      message: 'Authentication error'
    });
  }
}