interface SectionHeadingProps {
  kicker: string
  title: string
  description: string
}

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="text-3xl text-stone-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">{description}</p>
    </div>
  )
}
