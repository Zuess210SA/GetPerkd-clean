'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { SessionExpiredHandler } from '@/components/auth/SessionExpiredHandler'
import { SessionGate } from '@/components/auth/SessionGate'
import { Toaster } from '@/components/ui/toaster'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          // Don't retry on 401/429 errors to prevent API flooding
          if (error?.message?.includes('Authentication') || 
              error?.message?.includes('Too many requests')) {
            return false
          }
          return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: false, // Never retry mutations
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SessionGate>
          {children}
        </SessionGate>
        <SessionExpiredHandler />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}