import { Reveal } from '../common/Reveal'
import type { Portfolio } from '../../types/portfolio'
import { PortfolioCard } from './PortfolioCard'

export function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {portfolios.map((portfolio, index) => (
        <Reveal key={portfolio.id} delay={0.07 * index} y={18} className="h-full">
          <PortfolioCard portfolio={portfolio} />
        </Reveal>
      ))}
    </div>
  )
}
