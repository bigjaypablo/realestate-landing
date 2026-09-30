import { Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { mailHref, telHref } from '../lib/contact'
import type { SocialPlatform } from '../types'
import { Container } from './Section'
import { Logo } from './Logo'

const socialIcons: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
}

export function Footer() {
  const { businessName, brokerage, contact, location, social } = siteConfig
  const socials = social.filter((link) => link.href)

  return (
    <footer className="bg-ink pb-24 pt-14 text-white/80 md:pb-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {brokerage.name} · {location.serviceArea}
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map(({ platform, href }) => {
                  const Icon = socialIcons[platform]
                  return (
                    <li key={platform}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${businessName} on ${platform} (opens in a new tab)`}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white hover:bg-white/10"
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <address className="text-sm not-italic leading-relaxed md:text-right">
            <a href={telHref()} className="block py-2 text-base font-medium text-white hover:underline">
              {contact.phoneDisplay}
            </a>
            <a href={mailHref()} className="block py-2 hover:underline">
              {contact.email}
            </a>
          </address>
        </div>

        <div className="mt-10 space-y-2 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/65">
          <p>{brokerage.licenseInfo}</p>
          <p>{brokerage.disclaimer}</p>
          <p>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
