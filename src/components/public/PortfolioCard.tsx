import { Badge, Card } from 'flowbite-react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <Card
      imgAlt={portfolio.title}
      imgSrc={portfolio.thumbnail_url}
      className="h-full rounded-3xl border border-white/70 bg-white/85 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/10"
    >
      <div className="flex items-start justify-between gap-4">
        <Badge color="warning" className="rounded-full px-3 py-1">
          {portfolio.category}
        </Badge>
        {portfolio.featured ? (
          <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-stone-100 uppercase">
            Featured
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl text-stone-900">{portfolio.title}</h3>
        <p className="mt-3 text-sm leading-7 text-stone-600">{portfolio.short_description}</p>
      </div>
      <Link
        to={`/portfolio/${portfolio.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
      >
        View case study
        <HiArrowUpRight className="h-4 w-4" />
      </Link>
    </Card>
  )
}
