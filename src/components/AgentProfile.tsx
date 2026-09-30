import { MapPin } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { track } from '../lib/analytics'
import { Button } from './Button'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

export function AgentProfile() {
  const { agent, location, brokerage } = siteConfig
  const firstName = agent.name.split(' ')[0]

  return (
    <Section id="agent" labelledBy="agent-heading">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-secondary md:max-w-none">
          <img
            src={agent.image.src}
            srcSet={agent.image.srcSet}
            sizes={agent.image.sizes ?? '(min-width: 768px) 40vw, 90vw'}
            alt={agent.image.alt}
            width={agent.image.width}
            height={agent.image.height}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </div>

        <div>
          <SectionHeading id="agent-heading" title={`Meet ${agent.name}`} />
          <p className="mt-2 text-lg font-medium text-ink/70">{agent.title}</p>
          <div className="mt-5 max-w-prose space-y-4 leading-relaxed text-ink/80">
            {agent.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-ink/75">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {location.serviceArea} · {brokerage.name}
          </p>
          <Button
            href="#contact"
            className="mt-8"
            onClick={() => track('cta_click', { location: 'agent_profile' })}
          >
            Talk to {firstName}
          </Button>
        </div>
      </div>
    </Section>
  )
}
