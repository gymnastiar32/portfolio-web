import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PortfolioForm } from '../../components/admin/PortfolioForm'
import { portfolioService } from '../../services/portfolioService'
import type { PortfolioPayload } from '../../types/portfolio'

export function PortfolioCreatePage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate(payload: PortfolioPayload) {
    setSubmitting(true)
    setError(null)

    try {
      await portfolioService.createPortfolio(payload)
      navigate('/admin/portfolio')
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Unable to create portfolio.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker w-fit">Create</p>
        <h2 className="text-4xl text-stone-900">Add a new case study</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
          Fill in the core narrative, upload visuals, and decide whether the project should stay in draft or go live immediately.
        </p>
      </div>
      <PortfolioForm submitLabel="Save portfolio" submitting={submitting} error={error} onSubmit={handleCreate} />
    </div>
  )
}
