/**
 * Analytics for GA4 and Meta Pixel.
 * - Nothing loads unless a valid ID is set in .env.
 * - Never pass personal data (name, email, phone, message) into track().
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'buyer_selected'
  | 'seller_selected'

type Params = Record<string, string | number | boolean>

interface Fbq {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
  push: unknown
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const rawGaId = import.meta.env.VITE_GA_MEASUREMENT_ID
const rawPixelId = import.meta.env.VITE_META_PIXEL_ID

const isGaId = (id?: string): id is string => !!id && /^G-[A-Z0-9]{4,}$/.test(id.trim())
const isPixelId = (id?: string): id is string => !!id && /^\d{8,20}$/.test(id.trim())

const META_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  lead_form_submit: 'Lead',
  phone_click: 'Contact',
  whatsapp_click: 'Contact',
}

function loadScript(src: string): void {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function initGa(id: string): void {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
}

function initPixel(id: string): void {
  if (window.fbq) return
  const fbq: Fbq = Object.assign(
    (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    },
    { queue: [] as unknown[][], loaded: true, version: '2.0', push: undefined as unknown },
  )
  fbq.push = fbq
  window.fbq = fbq
  window._fbq = fbq
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', id)
  fbq('track', 'PageView')
}

/** Call once at startup. Waits until the page has loaded so it never blocks rendering. */
export function initAnalytics(): void {
  const gaId = isGaId(rawGaId) ? rawGaId.trim() : null
  const pixelId = isPixelId(rawPixelId) ? rawPixelId.trim() : null
  if (!gaId && !pixelId) return

  const start = () => {
    if (gaId) initGa(gaId)
    if (pixelId) initPixel(pixelId)
  }
  const schedule = () => {
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(start, { timeout: 4000 })
    else setTimeout(start, 2000)
  }

  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  window.gtag?.('event', event, params)
  if (window.fbq) {
    const standard = META_STANDARD[event]
    if (standard) window.fbq('track', standard, params)
    else window.fbq('trackCustom', event, params)
  }
}
