import type { Testimonial } from '../types'

/**
 * SAMPLE CONTENT for the demo. Replace with real client testimonials
 * (with permission) and remove isPlaceholder. Empty array = section hidden.
 * Avatars are optional: remove `image` to show the default person icon.
 */
const avatar = (n: number) => ({
  src: `/images/avatar-${n}.jpg`,
  alt: 'Sample client portrait',
  width: 96,
  height: 96,
})

export const testimonials: Testimonial[] = [
  {
    id: 'sample-1',
    name: 'Michael R.',
    role: 'First-time buyer',
    text: 'Everything was explained in plain language, and I always knew what came next. I never felt rushed or left guessing.',
    image: avatar(1),
    isPlaceholder: true,
  },
  {
    id: 'sample-2',
    name: 'Sarah T.',
    role: 'Home seller',
    text: 'We had a clear plan from the first call, and every question got a quick, honest answer.',
    image: avatar(2),
    isPlaceholder: true,
  },
  {
    id: 'sample-3',
    name: 'David L.',
    role: 'Relocating family',
    text: 'Moving to a new city felt manageable because someone was in our corner from start to finish.',
    image: avatar(3),
    isPlaceholder: true,
  },
]
