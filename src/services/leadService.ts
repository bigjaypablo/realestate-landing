import { siteConfig } from '../config/siteConfig'
import type { LeadFormValues, LeadPayload } from '../types'

/**
 * LEAD DELIVERY LAYER
 *
 * The form calls submitLead() and knows nothing about your CRM.
 * Set VITE_LEAD_WEBHOOK_URL in your environment to send leads to a webhook:
 *   Zapier "Catch Hook", Make, GoHighLevel inbound webhook, Google Apps Script, etc.
 *
 * HubSpot / Follow Up Boss / other CRMs need private keys. Never put those in
 * frontend code. Deploy a tiny serverless function that holds the key, then
 * point VITE_LEAD_WEBHOOK_URL at it.
 * To add a custom integration, write a LeadAdapter and return it from resolveAdapter().
 */
export interface LeadAdapter {
  name: string
  submit(payload: LeadPayload): Promise<void>
}

const TRACKING_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']

function readTracking(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  TRACKING_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) out[key] = value
  })
  return out
}

function buildPayload(values: LeadFormValues): LeadPayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    intent: values.intent === 'selling' ? 'selling' : 'buying',
    budget: values.budget,
    message: values.message.trim(),
    pageUrl: window.location.href,
    referrer: document.referrer,
    submittedAt: new Date().toISOString(),
    tracking: readTracking(),
    source: siteConfig.businessName,
  }
}

const webhookAdapter = (url: string): LeadAdapter => ({
  name: 'webhook',
  async submit(payload) {
    // Google Apps Script does not send CORS headers, so its reply cannot be read.
    // no-cors still delivers the request, and a network failure still throws.
    const isAppsScript = url.includes('script.google.com')
    const response = await fetch(url, {
      method: 'POST',
      mode: isAppsScript ? 'no-cors' : 'cors',
      // text/plain keeps this a "simple" request (no CORS preflight).
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
    })
    if (!isAppsScript && !response.ok) {
      throw new Error(`Lead endpoint responded with ${response.status}`)
    }
  },
})

/** Development fallback: logs the lead and simulates a network delay. */
const devAdapter: LeadAdapter = {
  name: 'dev-console',
  async submit(payload) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.info('[leadService] No VITE_LEAD_WEBHOOK_URL set. Lead not sent:', payload)
  },
}

/** Production without an endpoint fails loudly so leads are never silently lost. */
const unconfiguredAdapter: LeadAdapter = {
  name: 'unconfigured',
  async submit() {
    throw new Error('VITE_LEAD_WEBHOOK_URL is not configured.')
  },
}

function resolveAdapter(): LeadAdapter {
  const url = import.meta.env.VITE_LEAD_WEBHOOK_URL?.trim()
  if (url) return webhookAdapter(url)
  return import.meta.env.DEV ? devAdapter : unconfiguredAdapter
}

export async function submitLead(values: LeadFormValues): Promise<void> {
  await resolveAdapter().submit(buildPayload(values))
}
