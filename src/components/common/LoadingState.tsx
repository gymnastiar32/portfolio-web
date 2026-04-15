import { Spinner } from 'flowbite-react'

export function LoadingState({ label = 'Loading content...' }: { label?: string }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-3xl border border-stone-200 bg-white/80 p-10 text-center shadow-sm">
      <Spinner color="yellow" size="xl" />
      <p className="max-w-md text-sm text-stone-600">{label}</p>
    </div>
  )
}
