import type { InputHTMLAttributes } from 'react'
import { Field, controlClasses, describedBy } from './Field'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string
  label: string
  error?: string
  hint?: string
}

export function Input({ id, label, error, hint, required, className, ...rest }: InputProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlClasses(Boolean(error))} h-12`}
        {...rest}
      />
    </Field>
  )
}
