import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Providers from './providers'

export const metadata: Metadata = {
  title: "Get Perk'd - Student Rewards Platform",
  description: 'Exclusive deals and rewards for university students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Header with logo + nav (no feature changes) */}
          <header className="w-full border-b border-black/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
              {/* Left: logo + wordmark */}
              <Link href="/" className="flex items-center gap-2" aria-label="Get Perk'd Home">
                <Image src="/perk-icon.png" alt="Get Perk'd" width={28} height={28} priority />
                <span className="text-lg font-bold">Get Perk’d</span>
              </Link>

              {/* Right: simple navigation */}
              <nav className="hidden md:flex items-center gap-5 text-sm">
                <Link href="/deals" className="hover:text-green-700 font-medium">Deals</Link>
                <Link href="/student/loyalty" className="hover:text-blue-700 font-medium">Loyalty Cards</Link>
                <Link href="/business" className="hover:text-black font-medium">For Businesses</Link>
                <Link href="/fundraising" className="hover:text-black font-medium">Fundraising</Link>
                <Link href="/auth?mode=signin" className="hover:text-black">Sign In</Link>
                <Link
                  href="/auth?mode=signup"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-black text-white font-semibold"
                >
                  Sign Up
                </Link>
              </nav>
            </div>
          </header>

          {/* Page content */}
          {children}

          {/* Tiny safety note */}
          <p className="mt-6 text-center text-[11px] text-black/40">
            Not affiliated with or endorsed by the universities mentioned.
          </p>
        </Providers>
      </body>
    </html>
  )
}
