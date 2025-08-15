'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SessionExpiredHandler() {
  const [showExpiredMessage, setShowExpiredMessage] = useState(false)
  const [is429Error, setIs429Error] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Listen for 401/429 errors from API calls
    const handleApiError = (event: CustomEvent) => {
      const { status, message } = event.detail
      
      if (status === 401) {
        setShowExpiredMessage(true)
        setIs429Error(false)
      } else if (status === 429) {
        setIs429Error(true)
        setShowExpiredMessage(true)
      }
    }

    // Listen for custom auth error events
    window.addEventListener('authError', handleApiError as EventListener)
    
    return () => {
      window.removeEventListener('authError', handleApiError as EventListener)
    }
  }, [])

  const handleLoginRedirect = () => {
    // Clear any stale tokens
    localStorage.removeItem('sb-session')
    localStorage.removeItem('sb-refresh-token')
    localStorage.removeItem('auth_user_cache')
    
    // Redirect to login
    router.push('/auth')
    setShowExpiredMessage(false)
  }

  const handleRetry = () => {
    setShowExpiredMessage(false)
    setIs429Error(false)
    // Reload the page to retry
    window.location.reload()
  }

  if (!showExpiredMessage) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="border border-red-500 bg-red-50 dark:bg-red-950 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-red-800 dark:text-red-200 mb-3">
              {is429Error 
                ? "Too many login attempts. Please wait a moment before trying again."
                : "Looks like your session expired. Please log in again."
              }
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleLoginRedirect}
                className="bg-white dark:bg-gray-800 text-xs"
              >
                Log In Again
              </Button>
              {is429Error && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleRetry}
                  className="bg-white dark:bg-gray-800 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Utility function to trigger session expired message
export function triggerAuthError(status: number, message?: string) {
  const event = new CustomEvent('authError', {
    detail: { status, message }
  })
  window.dispatchEvent(event)
}