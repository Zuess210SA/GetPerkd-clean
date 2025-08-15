'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Get <span className="text-brand-blue">Perk'd</span> - Student Rewards Platform
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect students with exclusive local business discounts across universities, 
          community colleges, and trade schools.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/auth">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Link href="/business">For Businesses</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}