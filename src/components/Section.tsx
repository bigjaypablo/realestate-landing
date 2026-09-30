import type { ReactNode } from 'react'

type Tone = 'default' | 'tint' | 'dark'

const tones: Record<Tone, string> = {
  default: 'bg-surface text-ink',
  tint: 'bg-secondary text-ink',
  dark: 'bg-primary text-white',
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

interface SectionProps {
  id?: string
  labelledBy?: string
  tone?: Tone
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, tone = 'default', className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
