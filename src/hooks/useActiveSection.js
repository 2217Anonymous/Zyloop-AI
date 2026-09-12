import { useEffect, useState } from 'react'
import { getFixedNavHeight } from '../utils/fixedHeader'

const SECTION_IDS = [
  'home',
  'about',
  'clients',
  'industry-agents',
  'comparison',
  'business-categories',
  'faq',
  'blog',
  'contact',
]

export default function useActiveSection(enabled = true) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    if (!enabled) return undefined

    const onScroll = () => {
      const offset = getFixedNavHeight() + 40
      let current = 'home'
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id
        }
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  return active
}
