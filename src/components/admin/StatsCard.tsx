interface StatsCardProps {
  label: string
  value: number
  tone?: 'default' | 'highlight' | 'dark'
}

export function StatsCard({ label, value, tone = 'default' }: StatsCardProps) {
  const toneClass =
    tone === 'highlight'
      ? 'bg-primary-100 text-primary-900 ring-primary-200'
      : tone === 'dark'
        ? 'bg-stone-950 text-stone-50 ring-stone-900'
        : 'bg-white text-stone-900 ring-stone-200'

  return (
    <div className={`rounded-3xl p-6 shadow-sm ring-1 ${toneClass}`}>
      <p className="text-xs font-semibold tracking-[0.28em] uppercase opacity-70">{label}</p>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
    </div>
  )
}
