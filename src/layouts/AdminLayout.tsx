import { Outlet } from 'react-router-dom'
import { AdminHeader } from '../components/admin/AdminHeader'
import { AdminSidebar } from '../components/admin/AdminSidebar'

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="section-shell py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <AdminSidebar />
          </aside>
          <div className="space-y-6">
            <AdminHeader />
            <div className="lg:hidden">
              <AdminSidebar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
