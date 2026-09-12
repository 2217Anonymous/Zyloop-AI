import { useEffect, useRef, useState } from 'react'

export default function useHeaderAppear(isHome = false) {
  const [appeared, setAppeared] = useState(() => {
    if (typeof window === 'undefined') return false
    return isHome ? window.scrollY > 520 : window.scrollY > 72
  })
  const [showTop, setShowTop] = useState(() => {
    if (typeof window === 'undefined') return false
    return isHome ? window.scrollY > 720 : window.scrollY > 400
  })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (isHome) {
        const heroHideAt = Math.max(window.innerHeight - 64, 520)
        setAppeared(y > heroHideAt)
        setShowTop(y > 240)
        return
      }
      setAppeared(y > 72)
      setShowTop(y > 240)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return { appeared, showTop }
}
