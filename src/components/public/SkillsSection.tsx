import { Badge, Card } from 'flowbite-react'
import { skillGroups } from '../../data/fallbackData'
import { SectionHeading } from '../common/SectionHeading'

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell py-14">
      <SectionHeading
        kicker="Skills & Tools"
        title="Systems-minded craft with enough flexibility for fast-moving teams."
        description="From audit work to full design directions, the toolkit stays intentionally practical: clear decisions, reusable components, and careful collaboration with engineering."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title} className="rounded-3xl border border-white/70 bg-white/80 shadow-sm">
            <h3 className="text-2xl text-stone-900">{group.title}</h3>
            <p className="text-sm leading-7 text-stone-600">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} color="warning" className="rounded-full px-3 py-1.5">
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
