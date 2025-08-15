export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Get</span>{' '}
            <span className="text-green-600">Perk'd</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Exclusive deals and rewards for university students. Collect stamps, unlock rewards, and save money at your favorite local businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/student/loyalty"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View My Loyalty Cards
            </a>
            <a
              href="/deals"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Deals
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collect Stamps</h3>
            <p className="text-gray-600">Visit participating businesses and collect stamps through QR codes or staff verification.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock Rewards</h3>
            <p className="text-gray-600">Complete your stamp card and unlock exclusive rewards and discounts.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-600">Enjoy exclusive student discounts and rewards from local businesses.</p>
          </div>
        </div>
      </div>
    </div>
  )
}