import { QueryClient } from '@tanstack/react-query'
import { triggerAuthError } from '@/components/auth/SessionExpiredHandler'

// Global request tracking to prevent flooding
const requestTracker = new Map<string, { count: number; lastRequest: number }>();
const REQUEST_LIMIT = 1; // Only 1 request per minute for /api/user/me
const REQUEST_WINDOW = 60000; // 1 minute

// Enhanced fetch with auth error handling and global throttling
export async function apiRequest(url: string, options: RequestInit = {}) {
  // Special throttling for /api/user/me
  if (url.includes('/api/user/me')) {
    const now = Date.now();
    const tracker = requestTracker.get(url) || { count: 0, lastRequest: 0 };
    
    // Check if we're within the rate limit window
    if (now - tracker.lastRequest < REQUEST_WINDOW) {
      if (tracker.count >= REQUEST_LIMIT) {
        console.log(`[THROTTLE] Blocking repeat call to ${url} - only ${REQUEST_LIMIT} per minute allowed`);
        triggerAuthError(429, 'Too many requests')
        throw new Error('Too many requests - please wait')
      }
    } else {
      // Reset counter if window expired
      tracker.count = 0;
    }
    
    // Update tracker
    requestTracker.set(url, {
      count: tracker.count + 1,
      lastRequest: now
    });
    
    console.log(`[API REQUEST] ${url} - Request #${tracker.count + 1} within window`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    // Handle auth errors
    if (response.status === 401) {
      triggerAuthError(401, 'Session expired')
      throw new Error('Authentication required')
    }

    if (response.status === 429) {
      triggerAuthError(429, 'Too many requests')
      throw new Error('Too many requests - please wait')
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    // Re-throw with proper error handling
    throw error
  }
}

// Default query client with auth-aware settings
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string
        
        // NEVER use apiRequest for authentication endpoints
        if (url.includes('/api/user/me')) {
          console.log(`[QUERY CLIENT] Intercepting ${url} - using direct fetch to prevent throttling`);
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)
          }
          return response.json()
        }
        
        return apiRequest(url)
      },
      retry: (failureCount, error: any) => {
        // Don't retry auth errors
        if (error?.message?.includes('Authentication') || 
            error?.message?.includes('Too many requests')) {
          return false
        }
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    }
  }
})