import { Navbar as FlowbiteNavbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import { useLocation } from 'react-router-dom'

export function Navbar() {
  const location = useLocation()
  const activeHash = location.hash

  return (
    <div className="sticky top-0 z-40 border-b border-white/70 bg-stone-50/85 backdrop-blur-xl">
        <FlowbiteNavbar
          fluid
          rounded={false}
          className="relative w-full border border-white/60 bg-white/75 px-6 py-6 shadow-sm sm:px-8 sm:py-8"
        >
          <div className="flex items-center justify-end gap-3">
            <NavbarToggle />
          </div>
          <NavbarCollapse className="md:absolute md:left-1/2 md:top-1/2 md:m-0 md:flex md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:justify-center md:gap-3">
            <NavbarLink className="px-3 py-2" href="/" active={location.pathname === '/' && activeHash === ''}>
              Home
            </NavbarLink>
            <NavbarLink className="px-3 py-2" href="/#about" active={location.pathname === '/' && activeHash === '#about'}>
              About
            </NavbarLink>
            <NavbarLink className="px-3 py-2" href="/#skills" active={location.pathname === '/' && activeHash === '#skills'}>
              Skills
            </NavbarLink>
            <NavbarLink
              className="px-3 py-2"
              href="/#portfolio"
              active={location.pathname === '/portfolio' || (location.pathname === '/' && activeHash === '#portfolio')}
            >
              Portfolio
            </NavbarLink>
            <NavbarLink className="px-3 py-2" href="/#contact" active={location.pathname === '/' && activeHash === '#contact'}>
              Contact
            </NavbarLink>
          </NavbarCollapse>
        </FlowbiteNavbar>
    </div>
  )
}
