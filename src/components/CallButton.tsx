import { Phone } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { telHref } from '../lib/contact'
import { track } from '../lib/analytics'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

interface CallButtonProps {
  location: string
  variant?: ButtonVariant
  size?: ButtonSize
  label?: string
  fullWidth?: boolean
  className?: string
}

export function CallButton({ location, variant = 'primary', size = 'md', label, fullWidth, className }: CallButtonProps) {
  return (
    <Button
      href={telHref()}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={() => track('phone_click', { location })}
    >
      <Phone aria-hidden="true" className="h-4 w-4" />
      {label ?? `Call ${siteConfig.contact.phoneDisplay}`}
    </Button>
  )
}
