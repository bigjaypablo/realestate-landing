import { audiences } from '../data/audiences'
import type { Intent } from '../types'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

export function BuyerSellerSection({ onSelect }: { onSelect: (intent: Intent) => void }) {
  return (
    <Section id="choose" tone="tint" labelledBy="choose-heading">
      <SectionHeading
        id="choose-heading"
        title="What brings you here?"
        description="Pick the option that fits and we'll set up your request."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {audiences.map(({ intent, title, description, cta, icon: Icon }) => (
          <button
            key={intent}
            type="button"
            onClick={() => onSelect(intent)}
            className="group flex flex-col items-start gap-4 rounded-lg border border-primary/20 bg-white p-6 text-left transition-colors hover:border-primary sm:p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="block font-display text-2xl text-primary">{title}</span>
            <span className="block max-w-sm text-base leading-relaxed text-ink/75">{description}</span>
            <span className="mt-2 inline-flex items-center border-b-2 border-accent pb-0.5 font-semibold text-primary">
              {cta}
            </span>
          </button>
        ))}
      </div>
    </Section>
  )
}
