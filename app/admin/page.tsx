'use client'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Get Perk'd - Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Admin Portal Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your admin dashboard will include:
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Platform-wide analytics</li>
                <li>• User management</li>
                <li>• Business verification</li>
                <li>• Content moderation</li>
                <li>• System health monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}