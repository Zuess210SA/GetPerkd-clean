import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6 sm:p-8">
      {/* HERO */}
      <section className="grid gap-8 sm:grid-cols-2 items-center">
        <div className="space-y-4">
          {/* Forced 2-line headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            <span>Local &amp; Student</span>
            <span className="block">Deals Near You</span>
          </h1>

        {/* Subtext */}
          <div className="text-lg text-black/70 space-y-1">
            <p>Save money at neighborhood spots!</p>
            <p>Students and local residents welcome.</p>
            <p>Discover unique offers! Collect stamps! Unlock rewards!</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/deals"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              See Deals Now
            </Link>
            <Link
              href="/student/loyalty"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              My Loyalty Cards
            </Link>
          </div>
        </div>

        {/* HERO IMAGE — using a working remote image so we can move on */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-black/5">
          <Image
            src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1600&auto=format&fit=crop"
            alt="Friends grabbing food and coffee"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* FEATURED DEALS PREVIEW */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Featured deals</h2>
          <Link href="/deals" className="text-sm font-semibold text-green-700 hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Coffee */}
          <DealCard
            title="50% off 2nd coffee"
            place="Campus Coffee Co."
            img="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
          />
          {/* Tacos */}
          <DealCard
            title="Buy 1 taco, get 1 free"
            place="Don Pepe’s Tacos"
            img="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop"
          />
          {/* Bowl */}
          <DealCard
            title="Lunch bowl $6.99"
            place="Poke House"
            img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
          />
        </div>

        {/* CLEAN PILL (safe wording) */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-sm text-black/60">
            Popular with students at <strong>UTSA, UIW, St. Mary’s</strong>
          </span>
        </div>
      </section>
    </main>
  )
}

/** Simple local card component (no badge) */
function DealCard({
  title,
  place,
  img
}: {
  title: string
  place: string
  img: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white">
      <div className="relative h-40 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-black/60">{place}</p>
        <div className="pt-2">
          <Link
            href="/deals"
            className="inline-flex items-center px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            See deal
          </Link>
        </div>
      </div>
    </div>
  )
}



