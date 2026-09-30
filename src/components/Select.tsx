import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { Field, controlClasses, describedBy } from './Field'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string
  hint?: string
}

export function Select({
  id,
  label,
  options,
  placeholder,
  error,
  hint,
  required,
  className,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`${controlClasses(Boolean(error))} h-12 appearance-none pr-10`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/60"
        />
      </div>
    </Field>
  )
}
