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

  // Optional cache helpers (caching currently disabled)
  const CACHE_KEY = 'auth_user_cache'
  const CACHE_DURATION = 5 * 60 * 1000

  const getCachedUser = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { user: cachedUser, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) return cachedUser
        localStorage.removeItem(CACHE_KEY)
      }
    } catch {
      localStorage.removeItem(CACHE_KEY)
    }
    return null
  }

  const setCachedUser = (userData: User | null) => {
    try {
      if (userData) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ user: userData, timestamp: Date.now() }))
      } else {
        localStorage.removeItem(CACHE_KEY)
      }
    } catch {
      // ignore storage errors
    }
  }

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('[AUTH] Session fetch error:', error)
          setUser(null)
        } else {
          setUser(session?.user ?? null)
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    // Clean up any old tokens first (defensive)
    const keys = [
      'sb-session', 'sb-refresh-token', 'sb-access-token',
      'supabase.auth.token', 'supabase_token', 'supabase_session',
      'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL + '-auth-token',
      CACHE_KEY
    ]
    keys.forEach(k => {
      try { localStorage.removeItem(k); sessionStorage.removeItem(k) } catch {}
    })

    try { await supabase.auth.signOut({ scope: 'global' }) } catch {}

    // IMPORTANT: removed invalid shouldCreateUser option
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('[AUTH] Login failed:', error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    })
    if (error) throw error
  }

  const signOut = async () => {
    setCachedUser(null)
    setUser(null)
    try { await supabase.auth.signOut({ scope: 'global' }) } catch (error) {
      console.error('[AUTH] SignOut error:', error)
    }

    const keys = [
      'sb-session', 'sb-refresh-token', 'sb-access-token',
      'supabase.auth.token', 'supabase_token', 'supabase_session',
      'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL + '-auth-token',
      CACHE_KEY
    ]
    keys.forEach(k => {
      try { localStorage.removeItem(k); sessionStorage.removeItem(k) } catch {}
    })
  }

  const value: AuthContextType = {
    user,
    loading,
    sessionReady,
    signIn,
    signUp,
    signOut
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

// In case your app imports a default:
// This line makes both `import AuthProvider from ...` and `import { AuthProvider } from ...` work.
export default AuthProvider
