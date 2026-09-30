import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import type { Testimonial } from '../types'

function Avatar({ image }: { image?: Testimonial['image'] }) {
  const [failed, setFailed] = useState(false)

  if (image && !failed) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-accent"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-accent"
    >
      <UserRound className="h-6 w-6" />
    </span>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, text, image, isPlaceholder } = testimonial
  const showBadge = siteConfig.showPlaceholderLabels && isPlaceholder

  return (
    <figure className="border-l-2 border-accent pl-6">
      {showBadge && (
        <span className="mb-3 inline-block rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white">
          Sample testimonial
        </span>
      )}
      <blockquote className="font-display text-xl leading-relaxed text-ink">{text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar image={image} />
        <span>
          <span className="block font-semibold text-ink">{name}</span>
          <span className="block text-sm text-ink/70">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
