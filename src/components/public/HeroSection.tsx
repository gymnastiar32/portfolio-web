import { Button } from 'flowbite-react'
import { HiArrowUpRight, HiEnvelope, HiSparkles } from 'react-icons/hi2'
import { Reveal } from '../common/Reveal'
import { siteProfile } from '../../data/fallbackData'

interface HeroSectionProps {
  featuredCount: number
}

export function HeroSection({ featuredCount }: HeroSectionProps) {
  const compactBio = `${siteProfile.shortBio.split('.')[0]}.`
  const stats = [
    { value: siteProfile.yearsOfExperience, label: 'Experience' },
    { value: `${featuredCount}+`, label: 'Featured works' },
    { value: 'UI/UX + React', label: 'Design & Frontend' },
  ]

  return (
    <section className="section-shell flex min-h-[calc(100svh-5.625rem)] py-1 sm:py-4">
      <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-2xl border border-primary-100 bg-white px-5 py-4 shadow-sm sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        <div className="absolute right-6 top-6 hidden h-16 w-16 border-r-2 border-t-2 border-primary-300 lg:block" />
        <div className="grid items-center gap-6 md:grid-cols-[1fr_0.72fr] md:gap-8 lg:grid-cols-[1fr_0.88fr] lg:gap-10">
          <Reveal className="relative z-10 max-w-2xl">
            <p className="section-kicker">
              <HiSparkles className="h-4 w-4" />
              Profile
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-stone-950 min-[420px]:text-4xl sm:text-5xl lg:text-5xl 2xl:text-6xl">
              I design and code <span className="text-primary-600">smooth frontend experiences</span>.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8 2xl:hidden">
              {compactBio}
            </p>
            <p className="mt-5 hidden max-w-xl text-base leading-8 text-stone-600 2xl:block">
              {siteProfile.shortBio}
            </p>
            <div className="mt-6 grid gap-3 min-[380px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-row">
              <Button as="a" href="#contact" color="yellow" size="lg" className="w-full sm:w-auto">
                <HiEnvelope className="mr-2 h-5 w-5" />
                Contact
              </Button>
              <Button as="a" href="#portfolio" color="light" size="lg" className="w-full border border-stone-200 bg-white sm:w-auto">
                Portfolio
                <HiArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-7 hidden grid-cols-3 gap-4 border-t border-primary-100 pt-5 sm:grid">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.08 * index} y={14} className="min-w-0 border-primary-200 sm:border-r sm:last:border-r-0">
                  <p className="break-words text-2xl font-bold leading-tight text-primary-600 lg:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-600 lg:text-sm">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs md:max-w-sm lg:max-w-lg lg:justify-self-end">
            <div className="absolute -right-3 top-6 h-[82%] w-[74%] bg-primary-300 sm:-right-4 sm:top-8" />
            <div className="absolute bottom-4 left-2 h-[78%] w-[76%] border-3 border-stone-950 sm:bottom-5 sm:border-4" />
            <div className="relative overflow-hidden rounded-2xl bg-primary-50">
              <img
                src={siteProfile.profileImage}
                alt={siteProfile.name}
                className="h-[clamp(12rem,28svh,16rem)] w-full object-cover object-[center_16%] transition duration-700 hover:scale-[1.03] sm:h-[clamp(18rem,38svh,28rem)] sm:object-[center_18%] md:h-[clamp(24rem,44svh,31rem)] lg:h-[min(58svh,34rem)]"
              />
            </div>
            <div className="relative z-10 mx-auto mt-3 w-[calc(100%-2rem)] rounded-2xl border border-primary-100 bg-white px-4 py-3 text-center shadow-lg shadow-primary-900/10 sm:absolute sm:-bottom-5 sm:right-4 sm:mx-0 sm:mt-0 sm:w-auto sm:px-5 sm:py-4 sm:text-left">
              <p className="text-sm font-semibold text-stone-950">{siteProfile.name}</p>
              <p className="mt-1 text-xs text-stone-500">UI/UX + Frontend Developer</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
