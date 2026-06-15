import { Badge } from 'flowbite-react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-900/5">
      <div className="aspect-[4/3] overflow-hidden bg-primary-50">
        <img
          src={portfolio.thumbnail_url}
          alt={portfolio.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <Badge color="yellow" className="rounded-full px-3 py-1">
            {portfolio.category}
          </Badge>
          {portfolio.featured ? (
            <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold text-stone-100 uppercase">
              Featured
            </span>
          ) : null}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-stone-950">{portfolio.title}</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">{portfolio.short_description}</p>
        </div>
        <Link
          to={`/portfolio/${portfolio.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          View case study
          <HiArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
