import { siteConfig } from '../config/siteConfig'

export const telHref = (): string => `tel:${siteConfig.contact.phone}`

export const mailHref = (): string => `mailto:${siteConfig.contact.email}`

export const whatsappHref = (message: string = siteConfig.contact.whatsappMessage): string =>
  `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
