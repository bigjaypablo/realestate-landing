import { siteConfig } from '../config/siteConfig'
import type { Faq } from '../types'

const { phoneDisplay } = siteConfig.contact
const { serviceArea } = siteConfig.location

export const faqs: Faq[] = [
  {
    id: 'after-submit',
    question: 'What happens after I send my details?',
    answer:
      'Your request goes to our team. We will contact you using the phone number or email you provided to talk through what you need.',
  },
  {
    id: 'not-ready',
    question: "I'm not sure I'm ready to buy or sell. Can I still get in touch?",
    answer:
      'Yes. Reaching out is a good way to ask questions and understand your options. You do not need a firm plan yet.',
  },
  {
    id: 'fastest',
    question: 'What is the fastest way to reach you?',
    answer: `Call ${phoneDisplay} or send a WhatsApp message. You can also send the form and we will get back to you.`,
  },
  {
    id: 'areas',
    question: 'Which areas do you serve?',
    answer: `We work with buyers and sellers in ${serviceArea}. If you are just outside that area, send a message and ask.`,
  },
]
