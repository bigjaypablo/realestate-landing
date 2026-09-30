# Real Estate Lead-Generation Landing Page

A fast, mobile-first, white-label landing page for real estate agents, built to turn paid and organic traffic into buyer and seller leads.

**Live demo:** https://realestate-landing-rdhz.vercel.app/
*Demo site. Names, listings and contact details are fictional.*

## Features
- Buyer / seller selector that pre-fills the lead form
- Validated lead form with loading, error and success states, spam honeypot, and UTM/click-ID capture
- Click-to-call, WhatsApp button and a mobile action bar
- Looping hero video that is skipped on Data Saver, slow connections and reduced-motion
- GA4 and Meta Pixel with conversion events (no personal data sent); nothing loads until IDs are set
- Semantic HTML, keyboard and screen-reader support, on-page SEO and Open Graph tags

## Stack
React 18, TypeScript, Vite, Tailwind CSS, Framer Motion (LazyMotion), Lucide icons

## White-label
Rebrand by editing data, not components:
- `src/config/siteConfig.ts`: business, agent, contact, colors, copy
- `src/data/`: properties, testimonials, FAQs, benefits
- `.env`: analytics IDs and lead webhook
- `public/`: images and hero video

## Lead delivery
The form calls `src/services/leadService.ts`, which posts JSON to `VITE_LEAD_WEBHOOK_URL`. It works with Zapier, Make, GoHighLevel, Google Apps Script, or a serverless function that holds private CRM keys (HubSpot, Follow Up Boss). Private keys are never placed in frontend code.

## Run locally
    npm install
    cp .env.example .env
    npm run dev

## Environment variables
| Variable | Purpose |
|---|---|
| `VITE_LEAD_WEBHOOK_URL` | Where form submissions are sent |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (optional) |
| `VITE_META_PIXEL_ID` | Meta Pixel (optional) |
