import { useCallback, useEffect, useRef, useState } from 'react'
import { heroSlides, tickerWords } from '../data/content'
import { scrollToHash } from '../hooks/useSmoothScroll'
import HeroSlide from './HeroSlide'
import SliderIndicators from './SliderIndicators'

const SLIDE_DURATION = 5500
const TICKER_INTERVAL = 50

export default function HeroSlider({ onWatchDemo }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const progressRef = useRef(0)
  const progressTimer = useRef(null)
  const slideTimer = useRef(null)
  const totalSlides = heroSlides.length

  const goTo = useCallback(
    (index) => {
      const clamped = ((index % totalSlides) + totalSlides) % totalSlides
      setDirection(index >= activeIndex ? 1 : -1)
      setActiveIndex(clamped)
      setProgress(0)
      progressRef.current = 0
    },
    [totalSlides, activeIndex],
  )

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (isPaused) return undefined
    if (progressTimer.current) clearInterval(progressTimer.current)
    if (slideTimer.current) clearTimeout(slideTimer.current)

    progressTimer.current = setInterval(() => {
      progressRef.current += (TICKER_INTERVAL / SLIDE_DURATION) * 100
      setProgress(Math.min(progressRef.current, 100))
    }, TICKER_INTERVAL)

    slideTimer.current = setTimeout(goNext, SLIDE_DURATION)

    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current)
      if (slideTimer.current) clearTimeout(slideTimer.current)
    }
  }, [activeIndex, isPaused, goNext])

  // Custom event listener so SideMenu or Header can trigger slide changes
  useEffect(() => {
    const handleGoToSlide = (e) => {
      if (typeof e.detail === 'number') {
        goTo(e.detail)
      }
    }
    window.addEventListener('zyloop:go-to-slide', handleGoToSlide)
    return () => window.removeEventListener('zyloop:go-to-slide', handleGoToSlide)
  }, [goTo])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (!touchStartX.current || !touchStartY.current) return
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const activeSlide = heroSlides[activeIndex]

  return (
    <section
      id="hero-slider"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] overflow-hidden bg-slate-950"
      aria-label="Zyloop AI Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => {
          const isCurrent = index === activeIndex
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isCurrent}
            >
              <HeroSlide
                slide={slide}
                isActive={isCurrent}
                direction={direction}
                onWatchDemo={onWatchDemo}
              />
            </div>
          )
        })}
      </div>

      {/* Original Marquee Ticker Strip */}
      <div className="absolute top-0 inset-x-0 z-[25] overflow-hidden py-2.5 pointer-events-none bg-ticker" aria-hidden="true">
        <div className="flex w-max whitespace-nowrap animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center">
              {tickerWords.map((word, idx) => (
                <span
                  key={`${set}-${idx}`}
                  className="inline-flex items-center gap-3 px-6 text-[11.5px] sm:text-[12.5px] font-mono font-semibold tracking-[0.18em] uppercase text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/50" />
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Slide Counter Pill (Top-Right) */}
      <div className="absolute top-12 sm:top-14 right-5 sm:right-8 z-40 flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-slate-200/80 shadow-md backdrop-blur-md text-slate-800 text-[12px] font-mono tracking-widest">
          <span className="font-bold" style={{ color: activeSlide.accentColor }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="w-4 h-[1px] bg-slate-300" />
          <span>{String(totalSlides).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Floating Minimalist Slide Navigation Controls (Bottom-Right) */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-30 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-xl">
        <button
          type="button"
          onClick={goPrev}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <SliderIndicators
          count={totalSlides}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={goTo}
          accentColor={activeSlide.accentColor}
        />

        <button
          type="button"
          onClick={goNext}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  )
}
