import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { formatNumber, formatPrice } from '../lib/format'
import type { Property } from '../types'
import { Button } from './Button'

interface PropertyCardProps {
  property: Property
  onInquire: (property: Property) => void
}

export function PropertyCard({ property, onInquire }: PropertyCardProps) {
  const { image, status, isPlaceholder, title, location, price, beds, baths, sqft } = property
  const showSample = siteConfig.showPlaceholderLabels && isPlaceholder

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary">{status}</span>
          {showSample && (
            <span className="rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white">Sample listing</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-2xl text-primary">{formatPrice(price)}</p>
        <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/70">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          {location}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-4 text-sm text-ink/80">
          <li className="flex items-center gap-1.5">
            <BedDouble aria-hidden="true" className="h-4 w-4" />
            {beds} beds
          </li>
          <li className="flex items-center gap-1.5">
            <Bath aria-hidden="true" className="h-4 w-4" />
            {baths} baths
          </li>
          <li className="flex items-center gap-1.5">
            <Ruler aria-hidden="true" className="h-4 w-4" />
            {formatNumber(sqft)} sq ft
          </li>
        </ul>

        <Button variant="outline" fullWidth className="mt-5" onClick={() => onInquire(property)}>
          Ask about this property
        </Button>
      </div>
    </article>
  )
}
