import { siteConfig } from '../config/siteConfig'

const { language, currency } = siteConfig.locale

const priceFormatter = new Intl.NumberFormat(language, {
  style: 'currency',
  currency,
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat(language)

export const formatPrice = (value: number): string => priceFormatter.format(value)
export const formatNumber = (value: number): string => numberFormatter.format(value)
