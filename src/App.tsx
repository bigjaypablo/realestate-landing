import { useCallback, useState } from 'react'
import { AgentProfile } from './components/AgentProfile'
import { BuyerSellerSection } from './components/BuyerSellerSection'
import { CTASection } from './components/CTASection'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { MobileBar } from './components/MobileBar'
import { Navbar } from './components/Navbar'
import { PropertyHighlights } from './components/PropertyHighlights'
import { Testimonials } from './components/Testimonials'
import { WhatsAppButton } from './components/WhatsAppButton'
import { WhyChooseUs } from './components/WhyChooseUs'
import { track } from './lib/analytics'
import type { FormPrefill, Intent, Property } from './types'

export default function App() {
  const [prefill, setPrefill] = useState<FormPrefill>({ intent: '', nonce: 0 })

  const goToForm = useCallback((next: Omit<FormPrefill, 'nonce'>) => {
    setPrefill({ ...next, nonce: Date.now() })
    document.getElementById('contact')?.scrollIntoView()
  }, [])

  const handleIntent = useCallback(
    (intent: Intent) => {
      track(intent === 'buying' ? 'buyer_selected' : 'seller_selected')
      goToForm({ intent })
    },
    [goToForm],
  )

  const handleInquire = useCallback(
    (property: Property) => {
      track('cta_click', { location: 'property_card' })
      goToForm({
        intent: 'buying',
        message: `I'm interested in ${property.title} (${property.location}).`,
      })
    },
    [goToForm],
  )

  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-primary"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <BuyerSellerSection onSelect={handleIntent} />
        <PropertyHighlights onInquire={handleInquire} />
        <WhyChooseUs />
        <AgentProfile />
        <Testimonials />
        <FAQ />
        <LeadForm prefill={prefill} />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton floating location="floating" />
      <MobileBar />
    </div>
  )
}
