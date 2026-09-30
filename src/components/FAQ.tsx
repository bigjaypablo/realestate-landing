import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faqs'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading id="faq-heading" title="Common questions" />
        <div className="border-t border-ink/15">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium text-ink"
                  >
                    {faq.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-primary transition-transform motion-reduce:transition-none ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-button-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-prose pb-5 leading-relaxed text-ink/75">{faq.answer}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
