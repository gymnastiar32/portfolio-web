import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PortfolioForm } from '../../components/admin/PortfolioForm'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { portfolioService } from '../../services/portfolioService'
import type { Portfolio, PortfolioPayload } from '../../types/portfolio'

export function PortfolioEditPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useDocumentTitle(portfolio ? `Edit ${portfolio.title}` : error ? 'Portfolio Not Found' : 'Edit Portfolio')

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await portfolioService.getPortfolioById(id)
        if (!data) {
          setError('This portfolio could not be found.')
          return
        }
        setPortfolio(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load this portfolio.')
      } finally {
        setLoading(false)
      }
    }

    void loadPortfolio()
  }, [id])

  async function handleUpdate(payload: PortfolioPayload) {
    setSubmitting(true)
    setError(null)

    try {
      await portfolioService.updatePortfolio(id, payload)
      navigate('/admin/portfolio')
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update portfolio.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingState label="Loading portfolio data..." />
  }

  if (!portfolio) {
    return <EmptyState title="Portfolio not found" description={error ?? 'This portfolio does not exist.'} ctaLabel="Back to list" ctaHref="/admin/portfolio" />
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker w-fit">Edit</p>
        <h2 className="text-4xl text-stone-900">Refine your case study</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
          Update narrative, visuals, or publish status. Changes will refresh the portfolio immediately after saving.
        </p>
      </div>
      <PortfolioForm initialPortfolio={portfolio} submitLabel="Update portfolio" submitting={submitting} error={error} onSubmit={handleUpdate} />
    </div>
  )
}
