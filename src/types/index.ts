import type { LucideIcon } from 'lucide-react'

export type Intent = 'buying' | 'selling'
export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube'

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
  sizes?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: SocialPlatform
  href: string
}

export interface SiteConfig {
  /** Shows "Sample" / "Placeholder" badges on placeholder content. Set false at launch. */
  showPlaceholderLabels: boolean
  businessName: string
  logo: ImageAsset | null
  locale: { language: string; currency: string }
  colors: { primary: string; secondary: string; accent: string }
  contact: {
    phone: string
    phoneDisplay: string
    whatsapp: string
    whatsappMessage: string
    email: string
  }
  location: { serviceArea: string }
  brokerage: { name: string; licenseInfo: string; disclaimer: string }
  agent: {
    name: string
    title: string
    bio: string[]
    image: ImageAsset
  }
  hero: {
    headline: string
    subheadline: string
    trustNote: string
    secondaryCta: string
    image: ImageAsset
    /** Optional looping background video. The image is used as the poster/fallback. */
    video?: { src: string; webm?: string }
  }
  cta: {
    nav: string
    heroPrimary: string
    formHeading: string
    formText: string
    formSubmit: string
    closingHeading: string
    closingText: string
  }
  privacyNote: string
  privacyUrl: string
  navLinks: NavLink[]
  social: SocialLink[]
}

export type PropertyStatus =
  | 'For sale'
  | 'Just listed'
  | 'Open house'
  | 'Under contract'
  | 'Sold'

export interface Property {
  id: string
  title: string
  location: string
  price: number
  beds: number
  baths: number
  sqft: number
  image: ImageAsset
  status: PropertyStatus
  isPlaceholder?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  image?: ImageAsset
  isPlaceholder?: boolean
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface Audience {
  intent: Intent
  title: string
  description: string
  cta: string
  icon: LucideIcon
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export interface LeadFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  intent: Intent | ''
  budget: string
  message: string
  /** Honeypot: real users never fill this in. */
  company: string
}

export type LeadFormErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'phone' | 'intent', string>
>

export interface FormPrefill {
  intent: Intent | ''
  message?: string
  nonce: number
}

export interface LeadPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  intent: Intent
  budget: string
  message: string
  pageUrl: string
  referrer: string
  submittedAt: string
  tracking: Record<string, string>
  source: string
}
