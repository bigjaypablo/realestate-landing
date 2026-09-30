import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { track } from '../lib/analytics'
import { Button } from './Button'
import { Container } from './Section'
import { Logo } from './Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-ink/10 bg-surface">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink/80 hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button href="#contact" size="sm" onClick={() => track('cta_click', { location: 'navbar' })}>
            {siteConfig.cta.nav}
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-primary/5 md:hidden"
          >
            {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-ink/10 bg-surface shadow-lg md:hidden"
        >
          <Container>
            <ul className="py-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg font-medium text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}
