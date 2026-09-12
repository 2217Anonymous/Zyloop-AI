import { useEffect, useRef, useState } from 'react'

export default function ScrollWatermark({ text, className = '', range = 400 }) {
  const containerRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let ticking = false

    const updatePosition = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only calculate if visible or near viewport
      if (rect.top < windowHeight + 200 && rect.bottom > -200) {
        const totalDistance = windowHeight + rect.height
        // Progress from 0 (entering from bottom) to 1 (leaving through top)
        const progress = (windowHeight - rect.top) / totalDistance
        // When scrolling top to bottom, progress increases, shift moves LEFT to RIGHT
        // When scrolling bottom to top, progress decreases, shift moves RIGHT to LEFT
        const shift = (progress - 0.5) * range
        setOffset(shift)
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    updatePosition()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [range])

  return (
    <div
      ref={containerRef}
      className={`scroll-watermark-wrapper ${className}`}
      aria-hidden="true"
    >
      <span
        className="scroll-watermark-text"
        style={{
          transform: `translate3d(${offset}px, 0, 0)`,
        }}
      >
        {text}
      </span>
    </div>
  )
}
