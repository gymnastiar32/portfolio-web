import {
  Footer as FlowbiteFooter,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
} from 'flowbite-react'
import { BsBehance, BsDribbble, BsGithub, BsLinkedin } from 'react-icons/bs'
import { siteProfile } from '../../data/fallbackData'

export function Footer() {
  const socialLinks = [
    { href: siteProfile.links.linkedin, icon: BsLinkedin, label: 'LinkedIn' },
    { href: siteProfile.links.behance, icon: BsBehance, label: 'Behance' },
    { href: siteProfile.links.dribbble, icon: BsDribbble, label: 'Dribbble' },
    { href: siteProfile.links.github, icon: BsGithub, label: 'GitHub' },
  ].filter((link): link is { href: string; icon: typeof BsLinkedin; label: string } => Boolean(link.href?.trim()))

  return (
    <footer className="section-shell py-10">
      <FlowbiteFooter container className="rounded-2xl border border-primary-100 bg-white shadow-sm">
        <div className="w-full">
          <div className="flex flex-col w-full gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <FooterBrand alt={`${siteProfile.name} logo`} name={siteProfile.name} src="/favicon.svg" href="/" />
              <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">{siteProfile.shortBio}</p>
            </div>
            <div className={`grid gap-8 ${socialLinks.length > 0 ? 'sm:grid-cols-2' : ''}`}>
              <div>
                <h3 className="mb-4 text-sm font-semibold text-stone-500 uppercase">Explore</h3>
                <FooterLinkGroup col>
                  <FooterLink href="/">Home</FooterLink>
                  <FooterLink href="/portfolio">Portfolio</FooterLink>
                </FooterLinkGroup>
              </div>
              {socialLinks.length > 0 ? (
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-stone-500 uppercase">Social</h3>
                  <div className="flex flex-wrap gap-4 text-stone-500">
                    {socialLinks.map((link) => (
                      <FooterIcon key={link.label} href={link.href} icon={link.icon} aria-label={link.label} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <FooterDivider />
          <FooterCopyright by={siteProfile.name} href="/" year={2026} />
        </div>
      </FlowbiteFooter>
    </footer>
  )
}
