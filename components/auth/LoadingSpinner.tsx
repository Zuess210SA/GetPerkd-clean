'use client'

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Loading session...
        </p>
      </div>
    </div>
  )
}