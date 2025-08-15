'use client'

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useAuth } from '@/components/auth/AuthProvider'

// Hook that delays queries until session is ready
export function useAuthAwareQuery<T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  const { sessionReady, user } = useAuth()
  
  return useQuery({
    queryKey,
    queryFn,
    ...options,
    // Only run query when session is ready
    enabled: sessionReady && (options?.enabled !== false),
    staleTime: options?.staleTime ?? 30000, // 30 second cache
  })
}

// Hook specifically for user profile data that requires authentication
export function useUserQuery() {
  const { sessionReady, user } = useAuth()
  
  return useQuery({
    queryKey: ['/api/user/me'],
    queryFn: async () => {
      console.log('[USER QUERY] Making delayed /api/user/me request after sessionReady=true')
      const response = await fetch('/api/user/me')
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`)
      }
      return response.json()
    },
    // Critical: Only run when session is ready AND user is authenticated
    enabled: sessionReady && !!user,
    staleTime: 60000, // Cache for 1 minute
    retry: false // Don't retry to prevent 429 flooding
  })
}