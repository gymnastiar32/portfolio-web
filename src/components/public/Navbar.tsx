import { Navbar as FlowbiteNavbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { siteProfile } from '../../data/fallbackData'
import { cn } from '../../utils/cn'

const homeSections = ['about', 'skills', 'portfolio', 'contact'] as const

type ActiveNav = '' | `#${(typeof homeSections)[number]}` | '/portfolio'

export function Navbar() {
  const location = useLocation()
  const navbarRef = useRef<HTMLDivElement | null>(null)
  const [activeNav, setActiveNav] = useState<ActiveNav>('')

  useEffect(() => {
    if (location.pathname !== '/') {
      return
    }

    const updateActiveSection = () => {
      if (window.scrollY < 80) {
        setActiveNav('')
        return
      }

      const navHeight = navbarRef.current?.offsetHeight ?? 0
      const activationLine = navHeight + 24
      const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24
      let nextActive: ActiveNav = ''
      let fallbackActive: ActiveNav = ''
      let mostVisibleSection: ActiveNav = ''
      let largestVisibleHeight = 0

      for (const sectionId of homeSections) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        const rect = section.getBoundingClientRect()
        const visibleTop = Math.max(rect.top, navHeight)
        const visibleBottom = Math.min(rect.bottom, window.innerHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)

        if (rect.top <= activationLine) {
          fallbackActive = `#${sectionId}`
        }

        if (visibleHeight > largestVisibleHeight) {
          largestVisibleHeight = visibleHeight
          mostVisibleSection = `#${sectionId}`
        }

        if (rect.top <= activationLine && rect.bottom >= activationLine) {
          nextActive = `#${sectionId}`
        }
      }

      if (mostVisibleSection && largestVisibleHeight >= 120) {
        setActiveNav(mostVisibleSection)
        return
      }

      if (isAtPageBottom) {
        setActiveNav('#contact')
        return
      }

      if (nextActive) {
        setActiveNav(nextActive)
        return
      }

      setActiveNav(fallbackActive)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [location.hash, location.pathname])

  const resolvedActiveNav: ActiveNav =
    location.pathname === '/portfolio' ? '/portfolio' : location.pathname === '/' ? activeNav : ''

  const linkClassName = (isActive: boolean) =>
    cn(
      'rounded-full px-4! py-2 text-sm font-semibold transition-all duration-200',
      isActive
        ? 'bg-primary-100! text-primary-800!'
        : 'text-stone-600! hover:bg-primary-50 hover:text-primary-800',
    )

  return (
    <div ref={navbarRef} className="sticky top-0 z-40 bg-primary-100/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <FlowbiteNavbar
        fluid
        rounded={false}
        className="relative mx-auto w-full max-w-7xl rounded-2xl border border-primary-100 bg-white px-4 py-3 shadow-sm sm:px-6"
      >
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-lg font-bold text-white">
            {siteProfile.name.charAt(0)}
          </span>
          <span className="text-sm font-bold text-stone-950 sm:text-base">{siteProfile.name}</span>
        </a>
        <div className="flex items-center justify-end gap-3 md:hidden">
          <NavbarToggle />
        </div>
        <NavbarCollapse className="mt-4 w-full rounded-2xl border border-stone-200/80 bg-white p-2 md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:flex md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:justify-center md:gap-1 md:border-0 md:bg-transparent md:p-0">
          <NavbarLink className={linkClassName(location.pathname === '/' && resolvedActiveNav === '')} href="/" active={location.pathname === '/' && resolvedActiveNav === ''}>
            Home
          </NavbarLink>
          <NavbarLink className={linkClassName(location.pathname === '/' && resolvedActiveNav === '#about')} href="/#about" active={location.pathname === '/' && resolvedActiveNav === '#about'}>
            About
          </NavbarLink>
          <NavbarLink className={linkClassName(location.pathname === '/' && resolvedActiveNav === '#skills')} href="/#skills" active={location.pathname === '/' && resolvedActiveNav === '#skills'}>
            Skills
          </NavbarLink>
          <NavbarLink
            className={linkClassName(resolvedActiveNav === '/portfolio' || (location.pathname === '/' && resolvedActiveNav === '#portfolio'))}
            href="/#portfolio"
            active={resolvedActiveNav === '/portfolio' || (location.pathname === '/' && resolvedActiveNav === '#portfolio')}
          >
            Portfolio
          </NavbarLink>
          <NavbarLink className={linkClassName(location.pathname === '/' && resolvedActiveNav === '#contact')} href="/#contact" active={location.pathname === '/' && resolvedActiveNav === '#contact'}>
            Contact
          </NavbarLink>
        </NavbarCollapse>
        <a
          href="/#contact"
          className="hidden rounded-xl border border-primary-500 px-5 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-500 hover:text-white md:inline-flex"
        >
          Contact
        </a>
      </FlowbiteNavbar>
    </div>
  )
}
