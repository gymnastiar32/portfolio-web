import { Badge } from 'flowbite-react'
import type { Portfolio } from '../../types/portfolio'

export function PortfolioDetailHeader({ portfolio }: { portfolio: Portfolio }) {
  return (
    <header className="section-shell pt-10 pb-8">
      <div className="glass-panel overflow-hidden">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge color="yellow" className="w-fit rounded-full px-3 py-1">
              {portfolio.category}
            </Badge>
            <h1 className="mt-4 text-4xl text-stone-900 sm:text-5xl">{portfolio.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">{portfolio.overview}</p>
            <dl className="mt-8 grid gap-4 text-sm text-stone-600 sm:grid-cols-2">
              <div className="rounded-2xl bg-white px-4 py-4 ring-1 ring-stone-200">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-500">Role</dt>
                <dd className="mt-2 text-lg font-medium text-stone-900">{portfolio.role}</dd>
              </div>
              <div className="rounded-2xl bg-white px-4 py-4 ring-1 ring-stone-200">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-500">Timeline</dt>
                <dd className="mt-2 text-lg font-medium text-stone-900">{portfolio.timeline}</dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-3xl bg-stone-950 shadow-2xl shadow-stone-900/15">
            <img
              src={portfolio.cover_image_url || portfolio.thumbnail_url}
              alt={portfolio.title}
              className="h-full min-h-80 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
