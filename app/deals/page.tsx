'use client'

import { DealGrid } from '@/components/DealGrid'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Browse Deals</h1>
          </div>
        </div>
      </div>
      
      <DealGrid />
    </div>
  )
}