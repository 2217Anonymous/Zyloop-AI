import {
  getCompactNavHeight,
  getScrollTarget,
  SCROLL_OFFSET_EXTRA,
  targetNeedsFixedOffset,
} from '../utils/fixedHeader'

export function scrollToHash(hash, extraOffset = 0) {
  if (!hash || hash === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const id = hash.replace('#', '')

  const performScroll = () => {
    const el = getScrollTarget(id)
    if (!el) return false

    const targetTop = el.getBoundingClientRect().top + window.scrollY
    const navHeight = targetNeedsFixedOffset(targetTop) ? getCompactNavHeight() : 0
    const offset = navHeight > 0 ? navHeight + SCROLL_OFFSET_EXTRA : 0
    const top = el.getBoundingClientRect().top + window.scrollY - offset - extraOffset

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    return true
  }

  if (performScroll()) return

  window.setTimeout(() => {
    performScroll()
  }, 120)
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
