import { testimonials } from '../data/testimonials'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { TestimonialCard } from './TestimonialCard'

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <Section id="testimonials" tone="tint" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" title="What clients say" />
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  )
}
