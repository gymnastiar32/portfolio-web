import { Badge, Card } from 'flowbite-react'
import { skillGroups } from '../../data/fallbackData'
import { SectionHeading } from '../common/SectionHeading'

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
      <SectionHeading
        kicker="Skills & Tools"
        title="Practical UI/UX skills built around problem-solving and user needs."
        description="I focus on delivering clear, effective design solutions through a user-centered approach, combining research, structured thinking, and collaboration with development teams."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title} className="rounded-3xl border border-white/70 bg-white/80 shadow-sm">
            <h3 className="text-2xl text-stone-900">{group.title}</h3>
            <p className="text-sm leading-7 text-stone-600">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} color="yellow" className="rounded-full px-3 py-1.5">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
