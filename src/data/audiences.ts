import { Home, Tag } from 'lucide-react'
import type { Audience } from '../types'

export const audiences: Audience[] = [
  {
    intent: 'buying',
    title: 'Buying a home',
    description: 'Get help finding, touring and making an offer on the right property.',
    cta: 'Start as a buyer',
    icon: Home,
  },
  {
    intent: 'selling',
    title: 'Selling a home',
    description: 'Get a plan for preparing, pricing and marketing your home.',
    cta: 'Start as a seller',
    icon: Tag,
  },
]
