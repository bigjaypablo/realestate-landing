import { siteConfig } from '../config/siteConfig'
import { CallButton } from './CallButton'
import { Section } from './Section'
import { WhatsAppButton } from './WhatsAppButton'

export function CTASection() {
  const { cta } = siteConfig
  return (
    <Section tone="tint" labelledBy="closing-heading" className="!py-14 sm:!py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 id="closing-heading" className="font-display text-2xl text-primary sm:text-3xl">
            {cta.closingHeading}
          </h2>
          <p className="mt-2 text-lg text-ink/75">{cta.closingText}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton location="closing_cta" />
          <WhatsAppButton location="closing_cta" />
        </div>
      </div>
    </Section>
  )
}
