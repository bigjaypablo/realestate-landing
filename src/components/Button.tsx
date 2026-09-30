import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'outlineLight' | 'whatsapp' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  accent: 'bg-accent text-primary hover:bg-accent/90',
  outline: 'border border-primary text-primary hover:bg-primary/5',
  outlineLight: 'border border-white/60 text-white hover:bg-white/10',
  whatsapp: 'bg-[#0B6B3F] text-white ring-1 ring-white/20 hover:bg-[#095a35]',
  ghost: 'text-primary hover:bg-primary/5',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-base',
}

type NativeProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children' | 'href'
>

interface ButtonProps extends NativeProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: ReactNode
  /** When provided, renders an <a>. Otherwise renders a <button>. */
  href?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  href,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
