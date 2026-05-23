import { useEffect, useMemo, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { PortfolioFilterBar } from '../../components/public/PortfolioFilterBar'
import { PortfolioGrid } from '../../components/public/PortfolioGrid'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { portfolioService } from '../../services/portfolioService'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentTitle('Portfolio')

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const data = await portfolioService.getPublishedPortfolios()
        setPortfolios(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load portfolio.')
      } finally {
        setLoading(false)
      }
    }

    void loadPortfolios()
  }, [])

  const categories = useMemo(() => Array.from(new Set(portfolios.map((portfolio) => portfolio.category))), [portfolios])

  const filteredPortfolios = useMemo(
    () =>
      portfolios.filter((portfolio) => {
        const matchesSearch = portfolio.title.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category ? portfolio.category === category : true
        return matchesSearch && matchesCategory
      }),
    [category, portfolios, search],
  )

  return (
    <section className="section-shell py-12">
      <div className="mb-8">
        <p className="section-kicker">Portfolio Archive</p>
        <h1 className="text-4xl text-stone-900 sm:text-5xl">Design case studies built around clarity, trust, and product momentum.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
          Browse published work across dashboards, checkout journeys, and UX diagnostics. Each case study focuses on how the interface helped a team or product move forward.
        </p>
      </div>

      <PortfolioFilterBar
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <div className="mt-8">
        {loading ? <LoadingState label="Loading published portfolio..." /> : null}
        {!loading && error ? (
          <EmptyState title="Portfolio could not be loaded" description={error} ctaLabel="Go home" ctaHref="/" />
        ) : null}
        {!loading && !error && portfolios.length === 0 ? (
          <EmptyState
            title="No published portfolio yet"
            description="This page only displays published records from the hosting database. Add a case study in admin, then publish it to make it visible here."
          />
        ) : null}
        {!loading && !error && portfolios.length > 0 && filteredPortfolios.length === 0 ? (
          <EmptyState
            title="No portfolio matches this search"
            description="Try a different keyword or remove the category filter to see more published work."
          />
        ) : null}
        {!loading && !error && filteredPortfolios.length > 0 ? <PortfolioGrid portfolios={filteredPortfolios} /> : null}
      </div>
    </section>
  )
}
