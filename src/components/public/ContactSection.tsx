import { Button } from 'flowbite-react'
import { HiArrowTopRightOnSquare, HiEnvelope, HiMapPin } from 'react-icons/hi2'
import { siteProfile } from '../../data/fallbackData'
import { Reveal } from '../common/Reveal'

const contactLinks = [
  { label: 'LinkedIn', href: siteProfile.links.linkedin },
  { label: 'Behance', href: siteProfile.links.behance },
  { label: 'Dribbble', href: siteProfile.links.dribbble },
  { label: 'Figma', href: siteProfile.links.figma },
  { label: 'GitHub', href: siteProfile.links.github },
].filter((link): link is { label: string; href: string } => Boolean(link.href?.trim()))

export function ContactSection() {
  return (
    <section id="contact" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
      <Reveal className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Contact</p>
          <h2 className="text-3xl font-semibold text-stone-950 sm:text-4xl">Feel free to reach out.</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            I am open to conversations about UI/UX design, React interfaces, and frontend development work.
          </p>
          <Button as="a" href={`mailto:${siteProfile.email}`} color="yellow" size="lg" className="mx-auto mt-7 w-full sm:w-fit">
            <HiEnvelope className="mr-2 h-5 w-5" />
            Send email
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={0.08} y={16} className="rounded-2xl bg-stone-950 p-6 text-stone-100">
            <p className="text-xs font-semibold uppercase text-primary-300">Email</p>
            <a href={`mailto:${siteProfile.email}`} className="mt-3 inline-flex items-center gap-3 text-base font-semibold text-white hover:text-primary-200">
              <HiEnvelope className="h-5 w-5" />
              {siteProfile.email}
            </a>
            <p className="mt-5 flex items-start gap-3 text-sm leading-7 text-stone-300">
              <HiMapPin className="mt-1 h-5 w-5 shrink-0 text-primary-300" />
              {siteProfile.location}
            </p>
          </Reveal>
          {contactLinks.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map((link, index) => (
                <Reveal
                  key={link.label}
                  delay={0.08 + index * 0.05}
                  y={14}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-primary-100 bg-white px-5 py-4 text-sm font-semibold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:text-primary-700"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate">{link.label}</span>
                      <HiArrowTopRightOnSquare className="h-4 w-4 shrink-0" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
