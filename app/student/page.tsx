'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function StudentDashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Get Perk'd - Student Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.email}</span>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Get Perk'd!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your student dashboard is being built. Coming soon:
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Browse exclusive student deals</li>
                <li>• Save your favorite offers</li>
                <li>• Track your redemptions</li>
                <li>• Earn rewards and badges</li>
                <li>• Campus-specific discounts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}