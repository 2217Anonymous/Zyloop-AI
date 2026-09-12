import { useEffect, useRef, useState } from 'react'

export default function useHeaderAppear() {
  const [appeared, setAppeared] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 260,
  )
  const [showTop, setShowTop] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 500,
  )

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const heroHideAt = Math.max(window.innerHeight - 64, 520)
      setAppeared(y > heroHideAt)
      setShowTop(y > heroHideAt + 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { appeared, showTop }
}
