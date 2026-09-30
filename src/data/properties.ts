import type { Property } from '../types'

/** SAMPLE DATA. Replace with the client's real listings (or delete entries). */
const img = (n: number) => ({
  src: `/images/property-${n}.jpg`,
  alt: 'Front exterior of the home',
  width: 800,
  height: 600,
})

export const properties: Property[] = [
  {
    id: 'sample-1',
    title: 'Modern Craftsman Family Home',
    location: 'Mueller, Austin',
    price: 450000,
    beds: 3,
    baths: 2,
    sqft: 1650,
    image: img(1),
    status: 'For sale',
    isPlaceholder: false,
  },
  {
    id: 'sample-2',
    title: 'Updated Ranch with Pool',
    location: 'Circle C, Austin',
    price: 725000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    image: img(2),
    status: 'Just listed',
    isPlaceholder: false,
  },
  {
    id: 'sample-3',
    title: 'Hill Country Contemporary',
    location: 'Westlake Hills, Austin',
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 3400,
    image: img(3),
    status: 'Open house',
    isPlaceholder: false,
  },
]
