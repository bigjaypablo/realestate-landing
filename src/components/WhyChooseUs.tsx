import { benefits } from '../data/benefits'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

export function WhyChooseUs() {
  return (
    <Section id="why" tone="tint" labelledBy="why-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading
          id="why-heading"
          title="What working with us looks like"
          description="Whether you are buying or selling, you get clear steps and a real person to ask."
        />
        <ul className="divide-y divide-primary/15 border-y border-primary/15">
          {benefits.map(({ id, title, description, icon: Icon }) => (
            <li key={id} className="flex gap-4 py-6">
              <Icon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-1 leading-relaxed text-ink/75">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
