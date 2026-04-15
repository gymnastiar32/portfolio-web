import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

export function EmptyState({ title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white/80 p-10 text-center shadow-sm">
      <p className="section-kicker mx-auto w-fit">Nothing Here Yet</p>
      <h2 className="text-3xl text-stone-900">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">{description}</p>
      {ctaLabel && ctaHref ? (
        <Button as={Link} to={ctaHref} color="warning" className="mx-auto mt-6 w-fit">
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  )
}
