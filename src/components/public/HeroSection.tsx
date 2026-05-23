import { Badge, Button } from 'flowbite-react'
import { HiSparkles } from 'react-icons/hi2'
import { siteProfile } from '../../data/fallbackData'

interface HeroSectionProps {
  featuredCount: number
}

export function HeroSection({ featuredCount }: HeroSectionProps) {
  return (
    <section className="section-shell pt-10 pb-14 sm:pt-16">
      <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary-200/60 via-transparent to-primary-100/50" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <img
                src={siteProfile.profileImage}
                alt={siteProfile.name}
                className="h-18 w-18 rounded-3xl border border-white/80 object-cover shadow-lg shadow-primary-900/10 sm:h-20 sm:w-20"
              />
              <div>
                <p className="text-sm font-semibold text-stone-900">{siteProfile.name}</p>
                <p className="text-sm text-stone-500">UI/UX Designer</p>
              </div>
            </div>
            <Badge color="yellow" icon={HiSparkles} className="mb-4 w-fit">
              Selected work for product, commerce, and operational interfaces
            </Badge>
            <h1 className="max-w-3xl text-4xl leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {siteProfile.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              {siteProfile.shortBio}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button as="a" href="#contact" color="light" size="lg" className="w-full sm:w-auto">
                Let&apos;s work together
              </Button>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-stone-200/80 bg-stone-950 p-5 text-stone-100 shadow-2xl shadow-stone-900/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Snapshot</p>
                <p className="mt-2 text-2xl font-semibold">{siteProfile.yearsOfExperience}</p>
              </div>
              <div className="rounded-2xl border border-primary-400/30 bg-primary-500/10 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.28em] text-primary-200">Featured work</p>
                <p className="mt-1 text-3xl font-semibold text-primary-100">{featuredCount}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Based in</p>
                <p className="mt-2 text-lg font-medium">{siteProfile.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Current focus</p>
                <p className="mt-2 text-lg font-medium">Design systems, landing pages, and admin interfaces</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Availability</p>
                <p className="mt-2 text-lg font-medium">{siteProfile.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
