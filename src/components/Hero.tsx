import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { m } from 'framer-motion'
import { siteConfig } from '../config/siteConfig'
import { track } from '../lib/analytics'
import { Button } from './Button'
import { Container } from './Section'

interface NetworkInfo {
  saveData?: boolean
  effectiveType?: string
}

/** Skip the video for reduced-motion users, Data Saver, and very slow connections. */
function canPlayVideo(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection
  if (connection?.saveData) return false
  if (/(^|-)2g$/.test(connection?.effectiveType ?? '')) return false
  return true
}

export function Hero() {
  const { hero, cta } = siteConfig
  const [playVideo, setPlayVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (hero.video && canPlayVideo()) setPlayVideo(true)
  }, [hero.video])

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-ink text-white">
      {/* The image loads first, so it is the fast first paint and the fallback. */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes={hero.image.sizes}
        alt={hero.image.alt}
        width={hero.image.width}
        height={hero.image.height}
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {playVideo && hero.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.image.src}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {hero.video.webm && <source src={hero.video.webm} type="video/webm" />}
          <source src={hero.video.src} type="video/mp4" />
        </video>
      )}


      <Container className="flex min-h-[calc(100svh-8rem)] items-end pb-14 pt-20 sm:min-h-[36rem] sm:items-center sm:py-28 lg:min-h-[40rem]">
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 id="hero-heading" className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{hero.subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="#contact"
              variant="accent"
              size="lg"
              onClick={() => track('cta_click', { location: 'hero_primary' })}
            >
              {cta.heroPrimary}
            </Button>
            <Button
              href="#properties"
              variant="outlineLight"
              size="lg"
              onClick={() => track('cta_click', { location: 'hero_secondary' })}
            >
              {hero.secondaryCta}
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {hero.trustNote}
          </p>
        </m.div>
      </Container>
    </section>
  )
}
