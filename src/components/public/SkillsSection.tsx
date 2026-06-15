import { Badge } from 'flowbite-react'
import { HiBeaker, HiCodeBracket, HiCursorArrowRays, HiMagnifyingGlass } from 'react-icons/hi2'
import { skillGroups } from '../../data/fallbackData'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const skillIcons = [HiCursorArrowRays, HiMagnifyingGlass, HiCodeBracket, HiBeaker]

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1fr]">
        <Reveal>
          <SectionHeading
            kicker="Capabilities"
            title="I combine design, research, and frontend development."
            description="I work across UI craft, research habits, and frontend coding with React, HTML, CSS, and JavaScript so interfaces stay clear, responsive, and usable."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index] ?? HiCursorArrowRays

            return (
              <Reveal
                key={group.title}
                delay={0.08 * index}
                y={18}
                className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-900/5"
              >
                <Icon className="h-6 w-6 text-primary-600" />
                <h3 className="mt-5 text-xl font-semibold text-stone-950">{group.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} color="yellow" className="rounded-full px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
