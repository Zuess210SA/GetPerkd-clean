import { createClient } from '@/utils/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Loyalty Cards</h2>
            <p className="text-gray-600">Track your progress and unlock rewards</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Available Deals</h2>
            <p className="text-gray-600">Browse exclusive student discounts</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Stats</h2>
            <p className="text-gray-600">View your savings and activity</p>
          </div>
        </div>
      </div>
    </div>
  )
}