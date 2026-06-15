import { HiCodeBracket, HiComputerDesktop, HiDevicePhoneMobile, HiSwatch } from 'react-icons/hi2'
import { siteProfile } from '../../data/fallbackData'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const services = [
  {
    title: 'Website Design',
    description: 'Clean interfaces for landing pages, portfolios, and product websites.',
    icon: HiComputerDesktop,
  },
  {
    title: 'Mobile App Design',
    description: 'User flows, wireframes, and polished mobile UI for core journeys.',
    icon: HiDevicePhoneMobile,
  },
  {
    title: 'Frontend Development',
    description: 'Responsive React, HTML, CSS, and JavaScript interfaces with smooth interaction details.',
    icon: HiCodeBracket,
  },
  {
    title: 'Brand Identity',
    description: 'Visual direction and UI foundations that keep products consistent.',
    icon: HiSwatch,
  },
]

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[0.78fr_1fr]">
        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal
                key={service.title}
                delay={0.07 * index}
                y={18}
                className="flex gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-900/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-950">{service.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{service.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.12}>
          <SectionHeading
            kicker="Overview"
            title="I connect product thinking, UI design, and frontend implementation."
            description={`${siteProfile.shortBio} I connect research, wireframes, prototypes, interface systems, and responsive frontend implementation so design intent remains consistent in code.`}
          />
        </Reveal>
      </div>
    </section>
  )
}
