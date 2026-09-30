import type { LeadFormErrors, LeadFormValues } from '../types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateLead(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {}

  if (!values.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Enter your last name.'

  const email = values.email.trim()
  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email, like name@example.com.'

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) errors.phone = 'Enter your phone number.'
  else if (digits.length < 7 || digits.length > 15) errors.phone = 'Enter a valid phone number.'

  if (!values.intent) errors.intent = 'Choose whether you are buying or selling.'

  return errors
}
