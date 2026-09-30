import { siteConfig } from '../config/siteConfig'

function hexToChannels(hex: string): string | null {
  const match = /^#?([a-f\d]{6})$/i.exec(hex.trim())
  if (!match) return null
  const n = parseInt(match[1], 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

/** Pushes siteConfig.colors into the CSS variables Tailwind reads. */
export function applyBrandTheme(): void {
  const root = document.documentElement
  const keys = ['primary', 'secondary', 'accent'] as const
  keys.forEach((key) => {
    const channels = hexToChannels(siteConfig.colors[key])
    if (channels) root.style.setProperty(`--color-${key}`, channels)
  })
}
