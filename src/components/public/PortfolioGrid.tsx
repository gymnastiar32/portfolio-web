import type { Portfolio } from '../../types/portfolio'
import { PortfolioCard } from './PortfolioCard'

export function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {portfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  )
}
