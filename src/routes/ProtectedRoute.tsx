import { Alert } from 'flowbite-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingState } from '../components/common/LoadingState'
import { env } from '../config/env'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingState label="Checking your admin session..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (!isAdmin) {
    return (
      <div className="section-shell py-16">
        <Alert color="red">
          This account is authenticated, but it is not the configured admin. Update <code>VITE_ADMIN_EMAIL</code>
          {env.adminEmail ? ` to match ${env.adminEmail}.` : ' in your environment variables.'}
        </Alert>
      </div>
    )
  }

  return <Outlet />
}
