import { Label, Select, TextInput } from 'flowbite-react'
import { useEffect, useMemo, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal'
import { PortfolioTable } from '../../components/admin/PortfolioTable'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { portfolioService } from '../../services/portfolioService'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Portfolio | null>(null)
  const [deleting, setDeleting] = useState(false)

  useDocumentTitle('Manage Portfolio')

  async function loadPortfolios() {
    setLoading(true)
    try {
      const data = await portfolioService.getAllPortfolios()
      setPortfolios(data)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load portfolio list.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadPortfolios()
  }, [])

  const categories = useMemo(() => Array.from(new Set(portfolios.map((portfolio) => portfolio.category))), [portfolios])

  const filteredPortfolios = useMemo(
    () =>
      portfolios.filter((portfolio) => {
        const matchesSearch = portfolio.title.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter ? portfolio.status === statusFilter : true
        const matchesCategory = categoryFilter ? portfolio.category === categoryFilter : true
        return matchesSearch && matchesStatus && matchesCategory
      }),
    [categoryFilter, portfolios, search, statusFilter],
  )

  async function handleDelete() {
    if (!pendingDelete) {
      return
    }

    setDeleting(true)
    try {
      await portfolioService.deletePortfolio(pendingDelete.id)
      setPendingDelete(null)
      await loadPortfolios()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete this portfolio.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="admin-panel grid gap-4 p-5 md:grid-cols-3">
        <div className="md:col-span-1">
          <Label htmlFor="admin-search">Search by title</Label>
          <TextInput id="admin-search" className="mt-2" icon={HiMagnifyingGlass} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search portfolio" />
        </div>
        <div>
          <Label htmlFor="admin-status">Status</Label>
          <Select id="admin-status" className="mt-2" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All status</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="admin-category">Category</Label>
          <Select id="admin-category" className="mt-2" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? <LoadingState label="Loading portfolio list..." /> : null}
      {!loading && error ? <EmptyState title="Portfolio list unavailable" description={error} ctaLabel="Create a case study" ctaHref="/admin/portfolio/create" /> : null}
      {!loading && !error && filteredPortfolios.length === 0 ? (
        <EmptyState
          title="No portfolio matches these filters"
          description="Try a different keyword or create a new case study to get started."
          ctaLabel="Create portfolio"
          ctaHref="/admin/portfolio/create"
        />
      ) : null}
      {!loading && !error && filteredPortfolios.length > 0 ? (
        <PortfolioTable items={filteredPortfolios} onDelete={setPendingDelete} />
      ) : null}

      <DeleteConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete this portfolio?"
        description={`This will permanently remove "${pendingDelete?.title ?? 'this portfolio'}" and its related tools and gallery records.`}
        deleting={deleting}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  )
}
