import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '../lib/contact'
import { track } from '../lib/analytics'
import { useElementInView } from '../hooks/useElementInView'
import { Button, type ButtonSize } from './Button'

interface WhatsAppButtonProps {
  location: string
  /** Floating round button (desktop/tablet only; mobile uses the bottom bar). */
  floating?: boolean
  label?: string
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

const linkProps = { target: '_blank', rel: 'noopener noreferrer' } as const

export function WhatsAppButton({ location, floating = false, label = 'Chat on WhatsApp', size = 'md', fullWidth, className }: WhatsAppButtonProps) {
  const formVisible = useElementInView('contact')
  const onClick = () => track('whatsapp_click', { location })

  if (floating) {
    if (formVisible) return null
    return (
      <a
        href={whatsappHref()}
        onClick={onClick}
        aria-label="Chat on WhatsApp (opens in a new tab)"
        className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-[#0B6B3F] text-white shadow-lg transition-colors hover:bg-[#095a35] md:flex"
        {...linkProps}
      >
        <MessageCircle aria-hidden="true" className="h-7 w-7" />
      </a>
    )
  }

  return (
    <Button
      href={whatsappHref()}
      variant="whatsapp"
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={onClick}
      {...linkProps}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      {label}
    </Button>
  )
}
