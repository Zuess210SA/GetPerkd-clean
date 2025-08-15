'use client'

import { useAuth } from './AuthProvider'
import { LoadingSpinner } from './LoadingSpinner'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface SessionGateProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function SessionGate({ children, requireAuth = false }: SessionGateProps) {
  const { loading, sessionReady, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Handle protected routes - MOVED BEFORE EARLY RETURNS
  useEffect(() => {
    if (sessionReady && requireAuth && !user) {
      // Only redirect if not already on auth page
      if (pathname !== '/auth') {
        router.push('/auth')
      }
    }
  }, [sessionReady, requireAuth, user, pathname, router])

  // Show loading spinner while session is initializing
  if (loading || !sessionReady) {
    return <LoadingSpinner />
  }

  // For protected routes, don't render content until authenticated
  if (requireAuth && !user) {
    return <LoadingSpinner />
  }

  // Session is ready, render children
  return <>{children}</>
}