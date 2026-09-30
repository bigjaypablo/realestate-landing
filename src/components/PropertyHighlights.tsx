import { properties } from '../data/properties'
import type { Property } from '../types'
import { PropertyCard } from './PropertyCard'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

export function PropertyHighlights({ onInquire }: { onInquire: (property: Property) => void }) {
  if (properties.length === 0) return null

  return (
    <Section id="properties" labelledBy="properties-heading">
      <SectionHeading
        id="properties-heading"
        title="Featured properties"
        description="A selection of current and recent listings."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} onInquire={onInquire} />
        ))}
      </div>
    </Section>
  )
}
