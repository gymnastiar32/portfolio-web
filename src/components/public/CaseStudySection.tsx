import { Badge } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const selectedImage = selectedImageIndex === null ? null : portfolio.gallery[selectedImageIndex]

  useEffect(() => {
    if (selectedImageIndex === null) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedImageIndex(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImageIndex])

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
                      <button
                        type="button"
                        className="group block h-72 w-full cursor-zoom-in overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`Preview ${item.caption ?? portfolio.title}`}
                      >
                        <img
                          src={item.image_url}
                          alt={item.caption ?? portfolio.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </button>
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
      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 px-4 py-6 backdrop-blur-sm sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.caption ?? portfolio.title}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative flex max-h-full w-full max-w-6xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close image preview"
            >
              <HiXMark className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="relative flex h-[76vh] max-h-[760px] min-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-950 shadow-2xl shadow-stone-950/40">
              <img
                src={selectedImage.image_url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
              />
              <div className="absolute inset-0 bg-stone-950/35" aria-hidden="true" />
              <img
                src={selectedImage.image_url}
                alt={selectedImage.caption ?? portfolio.title}
                className="relative z-10 max-h-full max-w-full object-contain"
              />
            </div>
            {selectedImage.caption ? (
              <p className="rounded-2xl bg-white px-5 py-3 text-sm leading-7 text-stone-700 shadow-lg">{selectedImage.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
