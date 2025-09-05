import { createBrowserClient } from '@supabase/ssr'

// Custom storage adapter to force sessionStorage with logging
const customStorage = {
  getItem: (key: string) => {
    console.log('[STORAGE] Reading from sessionStorage:', key)
    return typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null
  },
  setItem: (key: string, value: string) => {
    console.log('[STORAGE] Writing to sessionStorage:', key, 'Value length:', value.length)
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    console.log('[STORAGE] Removing from sessionStorage:', key)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key)
    }
  }
}

export function await createClient() {
  console.log('[SUPABASE] Creating client with FORCED sessionStorage')
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // FORCE sessionStorage with custom adapter and logging
        storage: customStorage,
        // Disable auto-refresh to force manual session management
        autoRefreshToken: false,
        // Force fresh session detection
        persistSession: false,
        // Detect session changes immediately
        detectSessionInUrl: true,
        // Force storage type logging
        storageKey: 'sb-session-forced'
      },
    }
  )
}