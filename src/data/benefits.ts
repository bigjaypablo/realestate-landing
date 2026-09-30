import { Compass, Handshake, KeyRound, TrendingUp, UserRound } from 'lucide-react'
import type { Benefit } from '../types'

/** Generic outcome-focused copy. Contains no claims or statistics. Edit freely. */
export const benefits: Benefit[] = [
  {
    id: 'local',
    title: 'Guidance shaped by your local market',
    description: 'Advice that reflects the neighborhoods, pricing and timing where you actually live.',
    icon: Compass,
  },
  {
    id: 'personal',
    title: 'A plan built around you',
    description: 'Your goals, timeline and budget set the direction, not a one-size-fits-all script.',
    icon: UserRound,
  },
  {
    id: 'buyers',
    title: 'Support for buyers',
    description: 'Help with searching, viewings, offers and the steps between accepted offer and keys.',
    icon: KeyRound,
  },
  {
    id: 'sellers',
    title: 'A strategy for sellers',
    description: 'A clear approach to preparing, pricing and marketing your home.',
    icon: TrendingUp,
  },
  {
    id: 'negotiation',
    title: 'Help with negotiation',
    description: 'Someone in your corner when it is time to talk terms.',
    icon: Handshake,
  },
]
