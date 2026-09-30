import { track } from '../lib/analytics'
import { useElementInView } from '../hooks/useElementInView'
import { Button } from './Button'
import { CallButton } from './CallButton'
import { WhatsAppButton } from './WhatsAppButton'

/** Fixed bottom action bar, mobile only. Hides while the lead form is on screen. */
export function MobileBar() {
  const formVisible = useElementInView('contact')
  if (formVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-3 gap-2 p-2">
        <CallButton location="mobile_bar" label="Call" variant="outline" size="sm" fullWidth />
        <WhatsAppButton location="mobile_bar" label="WhatsApp" size="sm" fullWidth />
        <Button
          href="#contact"
          variant="accent"
          size="sm"
          fullWidth
          onClick={() => track('cta_click', { location: 'mobile_bar' })}
        >
          Get started
        </Button>
      </div>
    </div>
  )
}
