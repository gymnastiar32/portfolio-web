import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AdminShellSkeleton, PublicRouteSkeleton } from '../components/common/PageSkeletons'
import { AdminLayout } from '../layouts/AdminLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { ProtectedRoute } from './ProtectedRoute'

const HomePage = lazy(() => import('../pages/public/HomePage').then((module) => ({ default: module.HomePage })))
const PortfolioPage = lazy(() =>
  import('../pages/public/PortfolioPage').then((module) => ({ default: module.PortfolioPage })),
)
const PortfolioDetailPage = lazy(() =>
  import('../pages/public/PortfolioDetailPage').then((module) => ({ default: module.PortfolioDetailPage })),
)
const LoginPage = lazy(() => import('../pages/admin/LoginPage').then((module) => ({ default: module.LoginPage })))
const DashboardPage = lazy(() =>
  import('../pages/admin/DashboardPage').then((module) => ({ default: module.DashboardPage })),
)
const PortfolioListPage = lazy(() =>
  import('../pages/admin/PortfolioListPage').then((module) => ({ default: module.PortfolioListPage })),
)
const PortfolioCreatePage = lazy(() =>
  import('../pages/admin/PortfolioCreatePage').then((module) => ({ default: module.PortfolioCreatePage })),
)
const PortfolioEditPage = lazy(() =>
  import('../pages/admin/PortfolioEditPage').then((module) => ({ default: module.PortfolioEditPage })),
)

function RouteFallback() {
  const location = useLocation()

  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return <AdminShellSkeleton />
  }

  return <PublicRouteSkeleton />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          </Route>

          <Route path="/admin/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="portfolio" element={<PortfolioListPage />} />
              <Route path="portfolio/create" element={<PortfolioCreatePage />} />
              <Route path="portfolio/:id/edit" element={<PortfolioEditPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
