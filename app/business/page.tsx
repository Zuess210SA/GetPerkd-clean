'use client'

import Link from 'next/link'

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Get Perk&apos;d - Business Dashboard</h1>
            </div>
            {/* Optional small actions in the header (non-destructive) */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/auth?mode=signin&role=business"
                className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5"
              >
                Sign In
              </Link>
              <Link
                href="/auth?mode=signup&role=business"
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Business Portal Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your business dashboard will include:
              </p>
              <ul className="text-left space-y-2 text-gray-700 mb-8">
                <li>• Create and manage deals</li>
                <li>• Track redemption analytics</li>
                <li>• Target specific campuses</li>
                <li>• Manage staff access</li>
                <li>• View performance metrics</li>
              </ul>

              {/* Non-destructive CTA area under your existing content */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/auth?mode=signup&role=business"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth?mode=signin&role=business"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black/10 font-semibold hover:bg-black/20 transition"
                >
                  Sign In
                </Link>
              </div>

              {/* If you want a disabled future action without wiring anything: */}
              {/* <button
                type="button"
                className="mt-6 px-4 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                aria-disabled
                title="Coming soon"
              >
                Create a Deal (Coming Soon)
              </button> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
