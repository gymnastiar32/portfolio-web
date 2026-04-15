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
  return (
    <footer className="section-shell py-10">
      <FlowbiteFooter container className="rounded-3xl border border-white/70 bg-white/85 shadow-sm">
        <div className="w-full">
          <div className="grid w-full justify-between gap-8 md:flex md:grid-cols-1">
            <div>
              <FooterBrand alt={`${siteProfile.name} logo`} name={siteProfile.name} src="/favicon.svg" href="/" />
              <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">{siteProfile.shortBio}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-[0.24em] text-stone-500 uppercase">Explore</h3>
                <FooterLinkGroup col>
                  <FooterLink href="/">Home</FooterLink>
                  <FooterLink href="/portfolio">Portfolio</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-[0.24em] text-stone-500 uppercase">Social</h3>
                <div className="flex gap-4 text-stone-500">
                  <FooterIcon href={siteProfile.links.linkedin} icon={BsLinkedin} />
                  <FooterIcon href={siteProfile.links.behance} icon={BsBehance} />
                  <FooterIcon href={siteProfile.links.dribbble} icon={BsDribbble} />
                  <FooterIcon href={siteProfile.links.github} icon={BsGithub} />
                </div>
              </div>
            </div>
          </div>
          <FooterDivider />
          <FooterCopyright by={siteProfile.name} href="/" year={2026} />
        </div>
      </FlowbiteFooter>
    </footer>
  )
}
