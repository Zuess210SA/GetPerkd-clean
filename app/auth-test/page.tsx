'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label' // Component not found
import { useAuth } from '@/components/auth/AuthProvider'
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

export default function AuthTestPage() {
  const { user, signIn, signOut, loading } = useAuth()
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  const [testResult, setTestResult] = useState<string>('')
  const [isTestLoading, setIsTestLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsTestLoading(true)
      setTestResult('🔄 Starting fresh login test...')
      
      await signIn(email, password)
      setTestResult('✅ Login successful with fresh tokens!')
    } catch (error: any) {
      setTestResult(`❌ Login failed: ${error.message}`)
    } finally {
      setIsTestLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsTestLoading(true)
      setTestResult('🔄 Testing complete logout...')
      
      await signOut()
      setTestResult('✅ Logout complete - all tokens cleared!')
    } catch (error: any) {
      setTestResult(`❌ Logout failed: ${error.message}`)
    } finally {
      setIsTestLoading(false)
    }
  }

  const testFreshTokens = async () => {
    try {
      setIsTestLoading(true)
      setTestResult('🔄 Testing fresh token generation...')
      
      const response = await fetch('/api/auth/test-fresh-tokens')
      const data = await response.json()
      
      if (data.success) {
        setTestResult(`✅ Fresh tokens verified! Access token: ${data.tokenInfo.accessTokenHash}`)
      } else {
        setTestResult(`❌ Token test failed: ${data.message}`)
      }
    } catch (error: any) {
      setTestResult(`❌ Token test error: ${error.message}`)
    } finally {
      setIsTestLoading(false)
    }
  }

  const clearAllStorage = () => {
    const supabaseKeys = [
      'sb-session', 'sb-refresh-token', 'sb-access-token',
      'supabase.auth.token', 'supabase_token', 'supabase_session',
      'auth_user_cache', 'sb-session-forced'
    ]
    
    supabaseKeys.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
    
    setTestResult('🧹 All storage cleared manually')
  }

  const checkStorageLocation = () => {
    console.log('[STORAGE CHECK] Checking where Supabase stores tokens...')
    
    // Check localStorage
    const localKeys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.includes('sb-')) {
        localKeys.push(key)
      }
    }
    
    // Check sessionStorage  
    const sessionKeys = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && key.includes('sb-')) {
        sessionKeys.push(key)
      }
    }
    
    console.log('[STORAGE CHECK] localStorage keys:', localKeys)
    console.log('[STORAGE CHECK] sessionStorage keys:', sessionKeys)
    
    const message = `📍 Storage Check: localStorage has ${localKeys.length} Supabase keys, sessionStorage has ${sessionKeys.length} keys`
    setTestResult(message)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-6 w-6" />
              Supabase Token Rotation Test
            </CardTitle>
            <CardDescription>
              Test fresh token generation and complete session cleanup
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Current Status */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {user ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-semibold">
                  Status: {loading ? 'Loading...' : user ? `Logged in as ${user.email}` : 'Not logged in'}
                </span>
              </div>
            </div>

            {/* Test Results */}
            {testResult && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-mono">{testResult}</p>
              </div>
            )}

            {/* Login Form */}
            {!user && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter test email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter test password"
                  />
                </div>
                <Button 
                  onClick={handleLogin} 
                  disabled={isTestLoading}
                  className="w-full"
                >
                  {isTestLoading ? 'Testing...' : 'Test Fresh Login'}
                </Button>
              </div>
            )}

            {/* Test Actions */}
            <div className="grid grid-cols-2 gap-4">
              {user && (
                <Button 
                  onClick={testFreshTokens} 
                  disabled={isTestLoading}
                  variant="outline"
                >
                  Test Fresh Tokens
                </Button>
              )}
              
              {user && (
                <Button 
                  onClick={handleLogout} 
                  disabled={isTestLoading}
                  variant="destructive"
                >
                  Test Complete Logout
                </Button>
              )}
              
              <Button 
                onClick={clearAllStorage} 
                variant="secondary"
              >
                Clear All Storage
              </Button>
              
              <Button 
                onClick={checkStorageLocation} 
                variant="outline"
              >
                Check Storage Location
              </Button>
            </div>

            {/* Instructions */}
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Test Steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Login with test credentials to generate fresh tokens</li>
                <li>Use "Test Fresh Tokens" to verify token generation</li>
                <li>Logout completely to test session cleanup</li>
                <li>Login again to confirm new tokens are generated</li>
                <li>Check browser console for detailed auth logs</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}