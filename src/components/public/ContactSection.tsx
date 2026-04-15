import { Button } from 'flowbite-react'
import { HiArrowTopRightOnSquare, HiEnvelope } from 'react-icons/hi2'
import { siteProfile } from '../../data/fallbackData'
import { SectionHeading } from '../common/SectionHeading'

const contactLinks = [
  { label: 'LinkedIn', href: siteProfile.links.linkedin },
  { label: 'Behance', href: siteProfile.links.behance },
  { label: 'Dribbble', href: siteProfile.links.dribbble },
  { label: 'Figma', href: siteProfile.links.figma },
  { label: 'GitHub', href: siteProfile.links.github },
]

export function ContactSection() {
  return (
    <section id="contact" className="section-shell py-14">
      <div className="glass-panel grid gap-8 p-7 sm:p-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          kicker="Contact"
          title="Open to product teams that care about craft and outcomes."
          description="If you need a designer who can structure ambiguous product problems and still sweat the details, I’d love to hear more about the challenge."
        />
        <div className="space-y-5">
          <div className="rounded-3xl bg-stone-950 p-6 text-stone-100">
            <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Email</p>
            <a
              href={`mailto:${siteProfile.email}`}
              className="mt-3 inline-flex items-center gap-3 text-lg font-semibold text-white hover:text-primary-200"
            >
              <HiEnvelope className="h-5 w-5" />
              {siteProfile.email}
            </a>
            <p className="mt-3 text-sm leading-7 text-stone-300">{siteProfile.availability}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-semibold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:text-primary-700"
              >
                <span className="flex items-center justify-between gap-3">
                  {link.label}
                  <HiArrowTopRightOnSquare className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
          <Button as="a" href={`mailto:${siteProfile.email}`} color="yellow" size="lg" className="w-fit">
            Start a conversation
          </Button>
        </div>
      </div>
    </section>
  )
}
