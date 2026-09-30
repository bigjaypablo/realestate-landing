import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { budgetRanges, intentOptions } from '../data/formOptions'
import { track } from '../lib/analytics'
import { mailHref } from '../lib/contact'
import { validateLead } from '../lib/validation'
import { submitLead } from '../services/leadService'
import type { FormPrefill, LeadFormErrors, LeadFormValues } from '../types'
import { Button } from './Button'
import { CallButton } from './CallButton'
import { Input } from './Input'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { Select } from './Select'
import { Textarea } from './Textarea'
import { WhatsAppButton } from './WhatsAppButton'

const emptyValues: LeadFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  intent: '',
  budget: '',
  message: '',
  company: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'
type TextField = 'firstName' | 'lastName' | 'email' | 'phone' | 'budget' | 'message' | 'company'
type ChangeTarget = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

const FOCUS_ORDER = ['firstName', 'lastName', 'email', 'phone', 'intent'] as const

export function LeadForm({ prefill }: { prefill: FormPrefill }) {
  const [values, setValues] = useState<LeadFormValues>(emptyValues)
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const started = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  const { cta, privacyNote, privacyUrl, contact, location } = siteConfig

  // Apply buyer/seller choice (and optional message) from elsewhere on the page.
  useEffect(() => {
    if (prefill.nonce === 0 || !prefill.intent) return
    setValues((current) => ({
      ...current,
      intent: prefill.intent,
      message: prefill.message ?? current.message,
    }))
    setErrors((current) => ({ ...current, intent: undefined }))
  }, [prefill])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const update = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    if (!started.current) {
      started.current = true
      track('lead_form_start')
    }
    setValues((current) => ({ ...current, [key]: value }))
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const bind = (name: TextField) => ({
    value: values[name],
    onChange: (event: ChangeEvent<ChangeTarget>) => update(name, event.target.value),
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const found = validateLead(values)
    setErrors(found)
    const firstInvalid = FOCUS_ORDER.find((key) => found[key])
    if (firstInvalid) {
      const id = firstInvalid === 'intent' ? 'lead-intent-buying' : `lead-${firstInvalid}`
      document.getElementById(id)?.focus()
      return
    }

    // Honeypot filled: quietly pretend it worked so bots move on.
    if (values.company) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      await submitLead(values)
      // Only non-personal fields go to analytics.
      track('lead_form_submit', { intent: values.intent, budget: values.budget || 'none' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setValues(emptyValues)
    setErrors({})
    setStatus('idle')
    started.current = false
  }

  const budgetLabel = values.intent === 'selling' ? 'Expected sale price range' : 'Budget'
  const submitting = status === 'submitting'

  return (
    <Section id="contact" tone="dark" labelledBy="contact-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading id="contact-heading" tone="dark" title={cta.formHeading} description={cta.formText} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <CallButton location="contact_section" variant="outlineLight" fullWidth />
            <WhatsAppButton location="contact_section" fullWidth />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/80">
            Or email{' '}
            <a href={mailHref()} className="font-medium text-white underline underline-offset-4">
              {contact.email}
            </a>
            . Serving {location.serviceArea}.
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 text-ink shadow-xl sm:p-8">
          {status === 'success' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="py-6 text-center outline-none">
              <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 font-display text-2xl text-primary">
                Thanks{values.firstName ? `, ${values.firstName.trim()}` : ''}. Your request is in.
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-ink/75">
                We will contact you soon using the details you provided.
              </p>
              <Button variant="ghost" className="mt-6" onClick={reset}>
                Send another request
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} aria-busy={submitting} className="relative">
              {status === 'error' && (
                <p role="alert" className="mb-5 rounded-md border border-red-700 bg-red-50 p-3 text-sm text-red-800">
                  We couldn&apos;t send your request. Please try again, or call {contact.phoneDisplay}.
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="lead-firstName"
                  label="First name"
                  required
                  autoComplete="given-name"
                  error={errors.firstName}
                  {...bind('firstName')}
                />
                <Input
                  id="lead-lastName"
                  label="Last name"
                  required
                  autoComplete="family-name"
                  error={errors.lastName}
                  {...bind('lastName')}
                />
                <Input
                  id="lead-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                  {...bind('email')}
                />
                <Input
                  id="lead-phone"
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  error={errors.phone}
                  {...bind('phone')}
                />

                <fieldset className="sm:col-span-2" aria-describedby={errors.intent ? 'lead-intent-error' : undefined}>
                  <legend className="mb-1.5 text-sm font-medium text-ink">
                    I&apos;m interested in{' '}
                    <span aria-hidden="true" className="text-red-700">
                      *
                    </span>
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {intentOptions.map((option) => (
                      <div key={option.value}>
                        <input
                          type="radio"
                          id={`lead-intent-${option.value}`}
                          name="intent"
                          value={option.value}
                          checked={values.intent === option.value}
                          onChange={() => update('intent', option.value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`lead-intent-${option.value}`}
                          className="flex h-12 cursor-pointer items-center justify-center rounded-md border border-ink/30 bg-white text-base font-medium text-ink transition-colors hover:border-ink/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.intent && (
                    <p id="lead-intent-error" role="alert" className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.intent}
                    </p>
                  )}
                </fieldset>

                <Select
                  id="lead-budget"
                  label={budgetLabel}
                  placeholder="Select a range"
                  options={budgetRanges}
                  className="sm:col-span-2"
                  {...bind('budget')}
                />

                <Textarea
                  id="lead-message"
                  label="Message"
                  rows={3}
                  placeholder="Anything we should know?"
                  className="sm:col-span-2"
                  {...bind('message')}
                />
              </div>

              {/* Honeypot field: hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                  />
                </label>
              </div>

              <Button type="submit" variant="accent" size="lg" fullWidth className="mt-6" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin motion-reduce:animate-none" />
                    Sending...
                  </>
                ) : (
                  cta.formSubmit
                )}
              </Button>

              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink/70">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {privacyNote}
                  {privacyUrl && (
                    <>
                      {' '}
                      <a href={privacyUrl} className="underline underline-offset-2">
                        Privacy policy
                      </a>
                    </>
                  )}
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
