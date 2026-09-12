/** Extra space below the fixed navbar for section headings */
export const SCROLL_OFFSET_EXTRA = 32

/** Scroll threshold where the compact fixed header activates */
export const HEADER_APPEAR_THRESHOLD = 260

const FALLBACK_FIXED_HEIGHT = 80

function readCssFixedHeight() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-fixed-height')
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : FALLBACK_FIXED_HEIGHT
}

/** Measure compact fixed navbar height (color lines + nav row). */
export function measureCompactNavHeight() {
  const inner = document.querySelector('.inner-header')
  if (!inner) return readCssFixedHeight()

  if (inner.classList.contains('header-appear') && inner.offsetHeight > 0) {
    return inner.offsetHeight
  }

  const hadAppear = inner.classList.contains('header-appear')
  inner.classList.add('header-appear')
  const measured = inner.offsetHeight
  if (!hadAppear) inner.classList.remove('header-appear')

  return measured > 0 ? measured : readCssFixedHeight()
}

export function getCompactNavHeight() {
  return measureCompactNavHeight()
}

export function getScrollOffset() {
  return getCompactNavHeight() + SCROLL_OFFSET_EXTRA
}

export function getFixedNavHeight() {
  const inner = document.querySelector('.inner-header')
  if (inner?.classList.contains('header-appear')) {
    return inner.offsetHeight || getCompactNavHeight()
  }
  if (window.scrollY > HEADER_APPEAR_THRESHOLD) {
    return getCompactNavHeight()
  }
  return 0
}

export function targetNeedsFixedOffset(targetTop) {
  return targetTop > HEADER_APPEAR_THRESHOLD || window.scrollY > HEADER_APPEAR_THRESHOLD
}

export function setHeaderMetrics({ naturalHeight, fixedHeight }) {
  const root = document.documentElement
  if (naturalHeight > 0) {
    root.style.setProperty('--header-natural-height', `${naturalHeight}px`)
  }
  if (fixedHeight > 0) {
    root.style.setProperty('--header-fixed-height', `${fixedHeight}px`)
    root.style.setProperty('--scroll-offset', `${fixedHeight + SCROLL_OFFSET_EXTRA}px`)
  }
}

/** Scroll to the visible heading inside a section, not the section edge. */
export function getScrollTarget(id) {
  const section = document.getElementById(id)
  if (!section) return null

  const heading =
    section.querySelector('.stats-modern-header') ||
    section.querySelector('.zen-vtab-header') ||
    section.querySelector('.faq-sec-header') ||
    section.querySelector('.blog-sec-header') ||
    section.querySelector('.section-heading') ||
    section.querySelector('h2') ||
    section.querySelector('h4')

  return heading || section
}
