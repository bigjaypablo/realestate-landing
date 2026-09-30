import type { SiteConfig } from '../types'

/**
 * EDIT THIS FILE TO REBRAND THE SITE.
 * Everything below is placeholder content. Replace it with the client's real details.
 */
const serviceArea = 'Greater Austin, TX'

export const siteConfig: SiteConfig = {
  // Set to false before launch to hide "Sample" / "Placeholder" badges.
  showPlaceholderLabels: false,

  businessName: 'Alder & Finch Realty',

  // Set to { src: '/images/logo.svg', alt: 'Your Realty Name', width: 160, height: 40 } to use an image logo.
  logo: null,

  locale: { language: 'en-US', currency: 'USD' },

  // Hex values. Applied as CSS variables at startup (see lib/theme.ts).
  colors: {
    primary: '#16352F',
    secondary: '#E8EEEB',
    accent: '#C8A063',
  },

  contact: {
    phone: '+15125550142', // used for tel: links (digits and leading + only)
    phoneDisplay: '(512) 555-0142',
    whatsapp: '15125550142', // country code + number, digits only
    whatsappMessage:
      "Hi, I found your website and I'd like to talk about buying or selling a home.",
    email: 'hello@example.com',
  },

  location: { serviceArea },

  brokerage: {
    name: 'Alder & Finch Realty',
    licenseInfo: 'Licensed real estate brokerage, Texas.',
    disclaimer: 'Demo website. Names, listings and contact details are fictional.',
  },

  agent: {
    name: 'Daniel Carter',
    title: 'Real Estate Agent',
    bio: [
      'Daniel helps first-time buyers, growing families and homeowners ready to sell. He keeps every step clear, from the first conversation to closing day.',
      'Expect honest advice, quick replies and a plan built around your timeline and budget.',
    ],
    image: {
      src: '/images/agent.jpg',
      alt: 'Portrait of Daniel Carter, real estate agent',
      width: 800,
      height: 1000,
    },
  },

  hero: {
    headline: 'Your next move, made simple.',
    subheadline: `Straightforward, personal guidance for buyers and sellers in ${serviceArea}.`,
    trustNote: `Serving ${serviceArea}`,
    secondaryCta: 'View featured properties',
    // Remove this line to use the image only.
    video: { src: '/videos/hero.mp4' },
    image: {
      src: '/images/hero-poster.jpg',
      alt: 'Modern home exterior at sunset',
      width: 1600,
      height: 900,
      // For real photos, add e.g.:
      // srcSet: '/images/hero-800.webp 800w, /images/hero-1600.webp 1600w',
      // sizes: '100vw',
    },
  },

  cta: {
    nav: 'Get started',
    heroPrimary: 'Talk to an agent',
    formHeading: "Tell us what you're looking for",
    formText: 'Share a few details and an agent will reach out to talk through your next step.',
    formSubmit: 'Request information',
    closingHeading: 'Prefer to talk it through?',
    closingText: 'Call us or send a WhatsApp message and ask your questions directly.',
  },

  privacyNote:
    'Your information is kept private and will only be used to contact you about your request.',
  privacyUrl: '', // e.g. '/privacy' (leave empty to hide the link)

  navLinks: [
    { label: 'Buy or sell', href: '#choose' },
    { label: 'Properties', href: '#properties' },
    { label: 'Your agent', href: '#agent' },
    { label: 'FAQ', href: '#faq' },
  ],

  // Only links with a real href are shown. Add the client's profiles.
  social: [
    { platform: 'facebook', href: '' },
    { platform: 'instagram', href: '' },
    { platform: 'linkedin', href: '' },
    { platform: 'youtube', href: '' },
  ],
}
