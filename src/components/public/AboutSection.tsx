import { siteProfile } from '../../data/fallbackData'
import { SectionHeading } from '../common/SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="section-shell py-14">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          kicker="About"
          title="Designing polished experiences for moments where clarity matters most."
          description="I enjoy work that blends product structure with visual restraint: flows that need to earn trust, reduce noise, and help teams feel in control."
        />
        <div className="glass-panel p-7 sm:p-8">
          <p className="text-sm leading-8 text-stone-700 sm:text-base">
            {siteProfile.shortBio} My approach starts with business context, then turns into interface systems that help people move with less hesitation. I care about hierarchy, edge states, and the quiet details that make software feel reliable.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-stone-950 px-5 py-4 text-stone-50">
              <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Experience</p>
              <p className="mt-2 text-2xl font-semibold">{siteProfile.yearsOfExperience}</p>
            </div>
            <div className="rounded-2xl bg-primary-100 px-5 py-4 text-primary-900">
              <p className="text-xs uppercase tracking-[0.28em]">Specialty</p>
              <p className="mt-2 text-lg font-semibold">Complex product flows</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 text-stone-900 shadow-sm ring-1 ring-stone-200">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Work style</p>
              <p className="mt-2 text-lg font-semibold">Collaborative and detail-driven</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
