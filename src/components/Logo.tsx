import { siteConfig } from '../config/siteConfig'

export function Logo({ tone = 'default', className = '' }: { tone?: 'default' | 'light'; className?: string }) {
  const { businessName, logo } = siteConfig
  return (
    <a href="#top" className={`inline-flex min-w-0 items-center ${className}`}>
      {logo ? (
        <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-9 w-auto" />
      ) : (
        <span
          className={`truncate font-display text-xl font-semibold tracking-tight ${
            tone === 'light' ? 'text-white' : 'text-primary'
          }`}
        >
          {businessName}
        </span>
      )}
    </a>
  )
}
