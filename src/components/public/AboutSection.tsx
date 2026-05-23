import { siteProfile } from '../../data/fallbackData'
import { SectionHeading } from '../common/SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          kicker="About"
          title="Designing user-centered experiences that solve real problems."
          description="I focus on turning complex ideas into simple, functional, and visually appealing digital solutions that deliver real value to users."
        />
        <div className="glass-panel p-7 sm:p-8">
          <p className="text-sm leading-8 text-stone-700 sm:text-base">
            {siteProfile.shortBio} I approach design by understanding user needs and business goals, then translating them into intuitive interfaces. From research and wireframing to prototyping, I aim to create experiences that are not only usable but also meaningful.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-stone-950 px-5 py-4 text-stone-50">
              <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Experience</p>
              <p className="mt-2 text-2xl font-semibold">{siteProfile.yearsOfExperience}</p>
            </div>
            <div className="rounded-2xl bg-primary-100 px-5 py-4 text-primary-900">
              <p className="text-xs uppercase tracking-[0.28em]">Specialty</p>
              <p className="mt-2 text-lg font-semibold">User-centered design</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 text-stone-900 shadow-sm ring-1 ring-stone-200">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Work style</p>
              <p className="mt-2 text-lg font-semibold">Problem-solving & detail-oriented</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
