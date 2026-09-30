import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

export function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ')
  return ids || undefined
}

export const controlClasses = (hasError: boolean): string =>
  `w-full rounded-md border bg-white px-3.5 text-base text-ink placeholder:text-ink/45 transition-colors ${
    hasError ? 'border-red-700' : 'border-ink/30 hover:border-ink/50'
  }`

export function Field({ id, label, required, error, hint, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-700">
            {' '}*
          </span>
        ) : (
          <span className="font-normal text-ink/60"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/65">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
