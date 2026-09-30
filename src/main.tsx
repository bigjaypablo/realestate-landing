import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import App from './App'
import { initAnalytics } from './lib/analytics'
import { applyBrandTheme } from './lib/theme'
import './index.css'

applyBrandTheme()
initAnalytics()

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
)
