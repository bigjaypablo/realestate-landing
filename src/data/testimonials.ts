import type { Testimonial } from '../types'

/**
 * SAMPLE CONTENT for the demo. Replace with real client testimonials
 * (with permission) and remove isPlaceholder. Empty array = section hidden.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'sample-1',
    name: 'Sample Client',
    role: 'First-time buyer',
    text: 'Everything was explained in plain language, and I always knew what came next. I never felt rushed or left guessing.',
    isPlaceholder: true,
  },
  {
    id: 'sample-2',
    name: 'Sample Client',
    role: 'Home seller',
    text: 'We had a clear plan from the first call, and every question got a quick, honest answer.',
    isPlaceholder: true,
  },
  {
    id: 'sample-3',
    name: 'Sample Client',
    role: 'Relocating family',
    text: 'Moving to a new city felt manageable because someone was in our corner from start to finish.',
    isPlaceholder: true,
  },
]
