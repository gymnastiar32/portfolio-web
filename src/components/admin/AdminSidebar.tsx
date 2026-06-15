import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiFolder, HiHome, HiPlusCircle } from 'react-icons/hi2'
import { useLocation } from 'react-router-dom'

export function AdminSidebar() {
  const location = useLocation()

  return (
    <Sidebar aria-label="Admin sidebar" className="h-full rounded-3xl border border-stone-200 bg-white overflow-clip">
      <SidebarItems className='rounded-3xl'>
        <SidebarItemGroup>
          <SidebarItem href="/admin" active={location.pathname === '/admin'} icon={HiHome}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/admin/portfolio" active={location.pathname === '/admin/portfolio'} icon={HiFolder}>
            Portfolio
          </SidebarItem>
          <SidebarItem
            href="/admin/portfolio/create"
            active={location.pathname === '/admin/portfolio/create'}
            icon={HiPlusCircle}
          >
            Create portfolio
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}
