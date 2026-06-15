import type { ReactNode } from 'react'
import { Navbar } from '../public/Navbar'

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-2xl bg-stone-200/80 ${className}`} />
}

function SkeletonText({ className = '' }: { className?: string }) {
  return <SkeletonBlock className={`h-3 ${className}`} />
}

function AdminSidebarSkeleton() {
  return (
    <div className="admin-panel h-full min-h-[320px] rounded-3xl p-4">
      <div className="space-y-3">
        <SkeletonBlock className="h-10 w-28" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-4/5" />
        <SkeletonBlock className="h-10 w-11/12" />
      </div>
    </div>
  )
}

function AdminHeaderSkeleton() {
  return (
    <header className="admin-panel flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-3">
        <SkeletonText className="w-36" />
        <SkeletonBlock className="h-9 w-56" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <SkeletonBlock className="h-10 w-24" />
        <SkeletonBlock className="h-14 w-60" />
      </div>
    </header>
  )
}

export function AdminShellSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="section-shell py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <AdminSidebarSkeleton />
          </aside>
          <div className="space-y-6">
            <AdminHeaderSkeleton />
            <div className="lg:hidden">
              <AdminSidebarSkeleton />
            </div>
            {children ?? <AdminDashboardSkeleton />}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="admin-panel p-6">
            <SkeletonText className="w-32" />
            <SkeletonBlock className="mt-4 h-11 w-20" />
          </div>
        ))}
      </div>
      <div className="admin-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <SkeletonBlock className="h-7 w-28 rounded-full" />
            <SkeletonBlock className="h-9 w-full max-w-xl" />
            <SkeletonText className="w-72 max-w-full" />
          </div>
          <SkeletonBlock className="h-10 w-44" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
              <SkeletonText className="w-20" />
              <SkeletonBlock className="mt-4 h-7 w-4/5" />
              <SkeletonText className="mt-3 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AdminTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[minmax(260px,1.5fr)_1fr_120px_120px_120px] gap-4 border-b border-stone-200 bg-stone-50 px-6 py-4 text-sm">
          {[0, 1, 2, 3, 4].map((item) => (
            <SkeletonText key={item} className="w-20" />
          ))}
        </div>
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="grid grid-cols-[minmax(260px,1.5fr)_1fr_120px_120px_120px] items-center gap-4 border-b border-stone-100 px-6 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <SkeletonBlock className="h-14 w-14 shrink-0" />
              <div className="w-full space-y-2">
                <SkeletonText className="w-3/4" />
                <SkeletonText className="w-full" />
              </div>
            </div>
            <SkeletonText className="w-28" />
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonText className="w-24" />
            <SkeletonBlock className="h-9 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SkeletonBlock className="h-7 w-20 rounded-full" />
        <SkeletonBlock className="h-11 w-72 max-w-full" />
        <SkeletonText className="w-full max-w-2xl" />
      </div>
      <div className="admin-panel grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">
              <SkeletonText className="w-28" />
              <SkeletonBlock className={item === 3 ? 'h-24 w-full' : 'h-11 w-full'} />
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <SkeletonBlock className="h-56 w-full rounded-3xl" />
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-2">
              <SkeletonText className="w-36" />
              <SkeletonBlock className="h-11 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="admin-panel grid gap-6 p-6 lg:grid-cols-2">
        {[0, 1].map((column) => (
          <div key={column} className="space-y-5">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <SkeletonText className="w-36" />
                <SkeletonBlock className="h-32 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PortfolioGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="glass-panel overflow-hidden">
          <SkeletonBlock className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <SkeletonBlock className="h-6 w-24 rounded-full" />
            <SkeletonBlock className="h-8 w-5/6" />
            <SkeletonText className="w-full" />
            <SkeletonText className="w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PortfolioDetailSkeleton() {
  return (
    <>
      <section className="section-shell py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            <SkeletonBlock className="h-7 w-36 rounded-full" />
            <SkeletonBlock className="h-14 w-full max-w-3xl" />
            <SkeletonText className="w-full max-w-2xl" />
            <SkeletonText className="w-5/6 max-w-2xl" />
          </div>
          <SkeletonBlock className="aspect-[4/3] w-full rounded-3xl" />
        </div>
      </section>
      <section className="section-shell pb-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="glass-panel p-6">
              <SkeletonBlock className="h-8 w-40" />
              <SkeletonText className="mt-4 w-full" />
              <SkeletonText className="mt-3 w-5/6" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function PublicRouteSkeleton() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-shell py-12">
        <div className="space-y-4">
          <SkeletonBlock className="h-7 w-36 rounded-full" />
          <SkeletonBlock className="h-14 w-full max-w-3xl" />
          <SkeletonText className="w-full max-w-2xl" />
        </div>
        <div className="mt-8">
          <PortfolioGridSkeleton count={3} />
        </div>
      </main>
    </div>
  )
}
