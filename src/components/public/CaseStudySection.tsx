import { Badge } from 'flowbite-react'
import type { Portfolio } from '../../types/portfolio'
import { Reveal } from '../common/Reveal'

function StudyBlock({ title, content, delay = 0 }: { title: string; content: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={18} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <h2 className="text-2xl text-stone-900">{title}</h2>
      <p className="mt-4 text-sm leading-8 text-stone-600 sm:text-base">{content}</p>
    </Reveal>
  )
}

export function CaseStudySection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="section-shell pb-16">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
        <div className="space-y-6">
          <StudyBlock title="Problem Statement" content={portfolio.problem_statement} />
          <StudyBlock title="Goals" content={portfolio.goals} delay={0.04} />
          <StudyBlock title="Process" content={portfolio.process} delay={0.04} />
          <StudyBlock title="Solution" content={portfolio.solution} delay={0.04} />
          <StudyBlock title="Result" content={portfolio.result} delay={0.04} />
          {portfolio.lessons_learned ? (
            <StudyBlock title="Lessons Learned" content={portfolio.lessons_learned} delay={0.04} />
          ) : null}
          {portfolio.gallery.length > 0 ? (
            <Reveal y={18} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <h2 className="text-2xl text-stone-900">Gallery</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {portfolio.gallery.map((item, index) => (
                  <Reveal
                    key={item.id ?? `${item.image_url}-${item.sort_order}`}
                    delay={0.06 * index}
                    y={14}
                    className="overflow-hidden rounded-3xl bg-stone-100"
                  >
                    <figure>
                      <img
                        src={item.image_url}
                        alt={item.caption ?? portfolio.title}
                        className="h-72 w-full object-cover transition duration-700 hover:scale-[1.03]"
                      />
                      {item.caption ? (
                        <figcaption className="px-4 py-3 text-sm leading-7 text-stone-600">{item.caption}</figcaption>
                      ) : null}
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
        <aside className="space-y-6">
          <Reveal delay={0.08} y={18} className="rounded-3xl bg-stone-950 p-6 text-stone-100 shadow-xl shadow-stone-900/15">
            <p className="text-xs uppercase tracking-[0.28em] text-primary-300">Tool stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {portfolio.tools.map((tool) => (
                <Badge key={tool.id ?? tool.tool_name} color="yellow" className="rounded-full px-3 py-1.5">
                  {tool.tool_name}
                </Badge>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12} y={18} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Case study focus</p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-stone-600">
              <li>Designing with strong narrative hierarchy.</li>
              <li>Making complex workflows feel more legible.</li>
              <li>Coding responsive frontend interfaces with smooth interaction details.</li>
            </ul>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
