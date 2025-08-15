'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase-client'

type AuthContextType = {
  user: User | null
  loading: boolean
  sessionReady: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionReady, setSessionReady] = useState(false)
  const supabase = createClient()
  
  // Cache management
  const CACHE_KEY = 'auth_user_cache'
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Cache utilities
  const getCachedUser = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { user: cachedUser, timestamp } = JSON.parse(cached)
        const now = Date.now()
        if (now - timestamp < CACHE_DURATION) {
          return cachedUser
        }
        localStorage.removeItem(CACHE_KEY)
      }
    } catch (error) {
      localStorage.removeItem(CACHE_KEY)
    }
    return null
  }

  const setCachedUser = (userData: User | null) => {
    try {
      if (userData) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          user: userData,
          timestamp: Date.now()
        }))
      } else {
        localStorage.removeItem(CACHE_KEY)
      }
    } catch (error) {
      // Silent fail for localStorage issues
    }
  }

  useEffect(() => {
    // DISABLED CACHING - Force fresh session check every time
    console.log('[AUTH] Initializing fresh session check - NO CACHE')
    
    // Get initial session with proper ready state - ALWAYS FRESH
    const getInitialSession = async () => {
      try {
        // Force fresh session check
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('[AUTH] Session fetch error:', error)
          setUser(null)
        } else {
          const userData = session?.user ?? null
          setUser(userData)
          console.log('[AUTH] Session initialized:', userData ? `User: ${userData.email}` : 'No user')
        }
      } catch (error) {
        console.error('[AUTH] Session initialization error:', error)
        setUser(null)
      } finally {
        setLoading(false)
        setSessionReady(true)
      }
    }

    getInitialSession()

    // Listen for auth changes with token refresh handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AUTH] Auth state change:', event)
        
        const userData = session?.user ?? null
        setUser(userData)
        // DISABLED: setCachedUser(userData) - NO MORE CACHING
        setLoading(false)

        // Handle token refresh - NO MANUAL STORAGE
        if (event === 'TOKEN_REFRESHED' && session) {
          console.log('[AUTH] Token refreshed successfully - letting Supabase handle storage')
          // DO NOT manually store tokens - let Supabase SSR handle this
        }

        // Handle session expiry  
        if (event === 'SIGNED_OUT') {
          console.log('[AUTH] User signed out - clearing all session data')
          
          // Nuclear cleanup on signout
          const supabaseKeys = [
            'sb-session', 'sb-refresh-token', 'sb-access-token',
            'supabase.auth.token', 'supabase_token', 'supabase_session',
            'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL + '-auth-token',
            CACHE_KEY
          ]
          
          supabaseKeys.forEach(key => {
            try {
              localStorage.removeItem(key)
              sessionStorage.removeItem(key)
            } catch (e) {}
          })
          
          setCachedUser(null)
          setUser(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    console.log('[AUTH] FORCING FRESH LOGIN - Clearing all dead tokens first')
    
    // 1. NUCLEAR CLEANUP before login to prevent token reuse
    const supabaseKeys = [
      'sb-session', 'sb-refresh-token', 'sb-access-token',
      'supabase.auth.token', 'supabase_token', 'supabase_session',
      'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL + '-auth-token',
      CACHE_KEY
    ]
    
    supabaseKeys.forEach(key => {
      try {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      } catch (e) {}
    })
    
    // 2. Force signOut to clear any persisted session
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (e) {
      console.log('[AUTH] SignOut before login completed')
    }
    
    // 3. Force fresh login with explicit options
    console.log('[AUTH] Attempting fresh login with clean session')
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        shouldCreateUser: false, // Prevent unnecessary user creation
      }
    })
    
    if (error) {
      console.error('[AUTH] Login failed:', error.message)
      throw error
    }
    
    if (data.session) {
      console.log('[AUTH] LOGIN SUCCESS - Fresh tokens generated:', {
        hasAccessToken: !!data.session.access_token,
        hasRefreshToken: !!data.session.refresh_token,
        tokenHash: data.session.access_token?.substring(0, 10) + '...'
      })
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    console.log('[AUTH] FORCING COMPLETE LOGOUT - Clearing all Supabase tokens')
    
    // 1. Clear cache immediately
    setCachedUser(null)
    setUser(null)
    
    // 2. Force sign out from Supabase with global scope
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (error) {
      console.error('[AUTH] SignOut error:', error)
    }
    
    // 3. NUCLEAR CLEANUP - Clear ALL possible Supabase storage keys
    const supabaseKeys = [
      'sb-session', 'sb-refresh-token', 'sb-access-token',
      'supabase.auth.token', 'supabase_token', 'supabase_session',
      'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL + '-auth-token',
      CACHE_KEY
    ]
    
    supabaseKeys.forEach(key => {
      try {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      } catch (e) {}
    })
    
    console.log('[AUTH] LOGOUT COMPLETE - All tokens destroyed')
  }

  const value: AuthContextType = {
    user,
    loading,
    sessionReady,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}