import { Avatar, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="admin-panel flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.24em] text-stone-500 uppercase">Admin workspace</p>
        <h1 className="mt-2 text-3xl text-stone-900">Portfolio Manager</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button as={Link} to="/" color="light">
          View site
        </Button>
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2">
          <Avatar rounded size="sm" placeholderInitials={user?.email?.slice(0, 2).toUpperCase()} />
          <div className="text-sm">
            <p className="font-semibold text-stone-900">{user?.email ?? 'Admin'}</p>
            <button type="button" onClick={() => void logout()} className="text-stone-500 hover:text-primary-700">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
