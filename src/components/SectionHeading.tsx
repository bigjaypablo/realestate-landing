interface SectionHeadingProps {
  id: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'default' | 'dark'
}

export function SectionHeading({ id, title, description, align = 'left', tone = 'default' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2
        id={id}
        className={`font-display text-3xl leading-tight tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-primary'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/80' : 'text-ink/75'}`}>{description}</p>
      )}
    </div>
  )
}
