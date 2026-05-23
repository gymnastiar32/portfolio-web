import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { StatsCard } from '../../components/admin/StatsCard'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { portfolioService } from '../../services/portfolioService'
import type { DashboardStats, Portfolio } from '../../types/portfolio'

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recent, setRecent] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentTitle('Admin Dashboard')

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardStats, portfolios] = await Promise.all([
          portfolioService.getDashboardStats(),
          portfolioService.getAllPortfolios(),
        ])
        setStats(dashboardStats)
        setRecent(portfolios.slice(0, 4))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    void loadDashboard()
  }, [])

  if (loading) {
    return <LoadingState label="Loading dashboard..." />
  }

  if (error || !stats) {
    return <EmptyState title="Dashboard unavailable" description={error ?? 'No stats available.'} ctaLabel="Go to portfolio" ctaHref="/admin/portfolio" />
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Total portfolio" value={stats.total} tone="dark" />
        <StatsCard label="Published" value={stats.published} tone="highlight" />
        <StatsCard label="Drafts" value={stats.draft} />
      </div>
      <div className="admin-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-kicker w-fit">Quick actions</p>
            <h2 className="text-3xl text-stone-900">Keep the portfolio fresh without touching source files.</h2>
          </div>
          <Button as={Link} to="/admin/portfolio/create" color="yellow">
            Create new case study
          </Button>
        </div>
        {recent.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
            <p className="text-lg font-semibold text-stone-900">No portfolio records in the hosting database yet</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              Start by creating your first case study. Draft items will appear here immediately, and published items will also show on the public website.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recent.map((portfolio) => (
              <Link
                key={portfolio.id}
                to={`/admin/portfolio/${portfolio.id}/edit`}
                className="rounded-3xl border border-stone-200 bg-stone-50 p-4 transition hover:-translate-y-0.5 hover:border-primary-300"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{portfolio.status}</p>
                <h3 className="mt-3 text-xl text-stone-900">{portfolio.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{portfolio.category}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
