'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchDeals() {
  const response = await fetch('/api/deals')
  if (!response.ok) {
    throw new Error('Failed to fetch deals')
  }
  return response.json()
}

export function DealGrid() {
  const { data: deals, isLoading, error } = useQuery({
    queryKey: ['deals'],
    queryFn: fetchDeals,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Deals</h2>
        <p className="text-gray-600">Unable to load deals at this time.</p>
      </div>
    )
  }

  const dealsData = deals?.deals || []

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Deals</h2>
      {dealsData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No deals available at the moment.</p>
          <p className="text-gray-500">Check back later for exciting student offers!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealsData.map((deal: any) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer">
              {/* Deal Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 relative overflow-hidden">
                {deal.image_url ? (
                  <img 
                    src={deal.image_url} 
                    alt={deal.title || deal.title_en}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold mb-2">{deal.discount_percentage}% OFF</div>
                      <div className="text-sm opacity-90 uppercase tracking-wide">{deal.category}</div>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {deal.category}
                  </span>
                </div>
              </div>
              
              {/* Deal Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{deal.title || deal.title_en}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{deal.description || deal.description_en}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-green-600">
                      {deal.discount_percentage}% OFF
                    </span>
                    {deal.business_name && (
                      <span className="text-sm text-gray-500">{deal.business_name}</span>
                    )}
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}