import type { Intent } from '../types'

export const intentOptions: { value: Intent; label: string }[] = [
  { value: 'buying', label: 'Buying' },
  { value: 'selling', label: 'Selling' },
]

export const budgetRanges: { value: string; label: string }[] = [
  { value: 'under-250k', label: 'Under $250k' },
  { value: '250k-500k', label: '$250k - $500k' },
  { value: '500k-750k', label: '$500k - $750k' },
  { value: '750k-1m', label: '$750k - $1M' },
  { value: '1m-plus', label: '$1M+' },
  { value: 'not-sure', label: 'Not sure yet' },
]
