import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { CaseStudySection } from '../../components/public/CaseStudySection'
import { PortfolioDetailHeader } from '../../components/public/PortfolioDetailHeader'
import { portfolioService } from '../../services/portfolioService'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioDetailPage() {
  const { slug = '' } = useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await portfolioService.getPortfolioBySlug(slug)
        if (!data) {
          setError('This case study was not found or is not published.')
          return
        }

        setPortfolio(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load this case study.')
      } finally {
        setLoading(false)
      }
    }

    void loadPortfolio()
  }, [slug])

  if (loading) {
    return (
      <div className="section-shell py-14">
        <LoadingState label="Loading case study..." />
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="section-shell py-14">
        <EmptyState title="Case study not found" description={error ?? 'This slug does not exist.'} ctaLabel="Back to portfolio" ctaHref="/portfolio" />
      </div>
    )
  }

  return (
    <>
      <PortfolioDetailHeader portfolio={portfolio} />
      <CaseStudySection portfolio={portfolio} />
    </>
  )
}
