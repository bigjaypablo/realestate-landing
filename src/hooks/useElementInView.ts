import { useEffect, useState } from 'react'

/** True while the element with this id is visible. Used to hide floating CTAs over the form. */
export function useElementInView(id: string): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById(id)
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [id])

  return inView
}
