import type { TextareaHTMLAttributes } from 'react'
import { Field, controlClasses, describedBy } from './Field'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string
  label: string
  error?: string
  hint?: string
}

export function Textarea({ id, label, error, hint, required, className, ...rest }: TextareaProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlClasses(Boolean(error))} min-h-28 py-3`}
        {...rest}
      />
    </Field>
  )
}
