import { Badge } from 'flowbite-react'
import type { Portfolio } from '../../types/portfolio'

function StudyBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <h2 className="text-2xl text-stone-900">{title}</h2>
      <p className="mt-4 text-sm leading-8 text-stone-600 sm:text-base">{content}</p>
    </section>
  )
}

export function CaseStudySection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="section-shell pb-16">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
        <div className="space-y-6">
          <StudyBlock title="Problem Statement" content={portfolio.problem_statement} />
          <StudyBlock title="Goals" content={portfolio.goals} />
          <StudyBlock title="Process" content={portfolio.process} />
          <StudyBlock title="Solution" content={portfolio.solution} />
          <StudyBlock title="Result" content={portfolio.result} />
          {portfolio.lessons_learned ? (
            <StudyBlock title="Lessons Learned" content={portfolio.lessons_learned} />
          ) : null}
          {portfolio.gallery.length > 0 ? (
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <h2 className="text-2xl text-stone-900">Gallery</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {portfolio.gallery.map((item) => (
                  <figure key={item.id ?? `${item.image_url}-${item.sort_order}`} className="overflow-hidden rounded-3xl bg-stone-100">
                    <img src={item.image_url} alt={item.caption ?? portfolio.title} className="h-72 w-full object-cover" />
                    {item.caption ? (
                      <figcaption className="px-4 py-3 text-sm leading-7 text-stone-600">{item.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl bg-stone-950 p-6 text-stone-100 shadow-xl shadow-stone-900/15">
            <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Tool stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {portfolio.tools.map((tool) => (
                <Badge key={tool.id ?? tool.tool_name} color="yellow" className="rounded-full px-3 py-1.5">
                  {tool.tool_name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Case study focus</p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-stone-600">
              <li>Designing with strong narrative hierarchy.</li>
              <li>Making complex workflows feel more legible.</li>
              <li>Balancing business constraints with user confidence.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
