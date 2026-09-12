import { useEffect, useRef } from 'react'
import UpperNav from './UpperNav'
import MainNav from './MainNav'
import ScrollWatermark from '../ui/ScrollWatermark'
import { setHeaderMetrics } from '../../utils/fixedHeader'

/**
 * SiteHeader
 * ----------
 * The <header> wrapper stays `position: relative` and in-flow at ALL times.
 * Only the inner `.inner-header` div becomes `position: fixed` (via
 * `.header-appear` class) when the user scrolls past 260px.
 *
 * Problem: when `.inner-header` goes `position: fixed`, it leaves normal flow,
 * so the parent `<header>` collapses to 0 height → page content jumps up
 * and gets hidden behind the fixed navbar.
 *
 * Solution: We measure the inner-header's natural (in-flow) height once, then
 * keep the wrapper <header> locked to that height so it always acts as a
 * spacer — even after the child goes fixed.
 */
export default function SiteHeader({ appeared, setMenuOpen, activeSection, isHome }) {
  const innerRef = useRef(null)
  const wrapperRef = useRef(null)
  const naturalHeightRef = useRef(0)
  const fixedHeightRef = useRef(0)

  useEffect(() => {
    const inner = innerRef.current
    const wrapper = wrapperRef.current
    if (!inner || !wrapper) return

    const applySpacerHeight = () => {
      if (isHome) {
        wrapper.style.minHeight = '0px'
        return
      }
      if (naturalHeightRef.current > 0) {
        wrapper.style.minHeight = `${naturalHeightRef.current}px`
      }
    }

    const publishMetrics = () => {
      setHeaderMetrics({
        naturalHeight: naturalHeightRef.current,
        fixedHeight: fixedHeightRef.current,
      })
    }

    const measureNaturalHeight = () => {
      // Measure ONLY when inner-header is in-flow (not fixed)
      if (!inner.classList.contains('header-appear')) {
        const h = inner.offsetHeight
        if (h > 0) {
          naturalHeightRef.current = h
          applySpacerHeight()
          publishMetrics()
        }
      }
    }

    const measureFixedHeight = () => {
      const hadAppear = inner.classList.contains('header-appear')
      inner.classList.add('header-appear')
      const h = inner.offsetHeight
      if (!hadAppear) inner.classList.remove('header-appear')
      if (h > 0) {
        fixedHeightRef.current = h
        publishMetrics()
      }
    }

    // Measure immediately (in case page loads at top)
    measureNaturalHeight()
    measureFixedHeight()

    // Also measure on resize (responsive changes)
    const ro = new ResizeObserver(() => {
      measureNaturalHeight()
      measureFixedHeight()
    })
    ro.observe(inner)

    // If page reloads mid-scroll, appeared=true immediately and inner is already fixed.
    // In that case, temporarily remove the class to measure, then restore.
    if (naturalHeightRef.current === 0 && inner.classList.contains('header-appear')) {
      inner.classList.remove('header-appear')
      const h = inner.offsetHeight
      if (h > 0) {
        naturalHeightRef.current = h
        applySpacerHeight()
      }
      inner.classList.add('header-appear')
    }

    return () => ro.disconnect()
  }, [isHome])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    if (isHome) {
      wrapper.style.minHeight = '0px'
      return
    }
    if (naturalHeightRef.current > 0) {
      wrapper.style.minHeight = `${naturalHeightRef.current}px`
    }
  }, [appeared, isHome])

  return (
    <header
      ref={wrapperRef}
      className={`site-header relative z-[9999]${isHome ? ' site-header--home-hero' : ' site-header--standard'}`}
    >
      <div
        ref={innerRef}
        className={`inner-header ${appeared ? 'header-appear' : ''} relative z-[9999]`}
      >
        {/* Watermark in back side of logo on left */}
        <div className="header-watermark-bg" aria-hidden="true">
          <ScrollWatermark text="ZYLOOP AI" className="header-scroll-watermark" range={280} />
        </div>
        <UpperNav onMenuOpen={() => setMenuOpen(true)} />
        <MainNav
          activeSection={activeSection}
          isHome={isHome}
          onMenuOpen={() => setMenuOpen(true)}
        />
      </div>
    </header>
  )
}
