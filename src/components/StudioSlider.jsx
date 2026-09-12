import { useState, useCallback, useEffect } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi'
import { slides } from '../data/content'
import { scrollToHash } from '../hooks/useSmoothScroll'

export default function StudioSlider() {
  // Start on index 1 ("MODREN CREATIVE STUDIO") matching the user design reference
  const [currentIndex, setCurrentIndex] = useState(1)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  const total = slides.length

  const changeSlide = useCallback(
    (newIndex, dir = 'next') => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setCurrentIndex((newIndex + total) % total)
      setTimeout(() => {
        setAnimating(false)
      }, 500)
    },
    [animating, total],
  )

  const handlePrev = useCallback(() => {
    changeSlide(currentIndex - 1, 'prev')
  }, [changeSlide, currentIndex])

  const handleNext = useCallback(() => {
    changeSlide(currentIndex + 1, 'next')
  }, [changeSlide, currentIndex])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') handlePrev()
      if (e.key === 'ArrowDown') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handlePrev, handleNext])

  const slide = slides[currentIndex]

  return (
    <section
      id="studio-slider"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-24 lg:py-32 select-none"
      aria-label="Creative Studio Carousel"
    >
      {/* Signature Yellow Background Block covering left ~80% */}
      <div
        className="absolute top-0 bottom-0 left-0 w-full lg:w-[80%] xl:w-[78%] z-0"
        style={{ backgroundColor: '#fed51b' }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6 min-h-[460px] sm:min-h-[520px]">
          {/* Left Vertical Social Icons */}
          <div className="hidden sm:flex flex-row lg:flex-col items-center gap-5 lg:gap-6 z-20 shrink-0 lg:mr-8 xl:mr-12">
            <a
              href="#social-fb"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 flex items-center justify-center text-[#202020] hover:scale-125 transition-transform"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="#social-x"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 flex items-center justify-center text-[#202020] hover:scale-125 transition-transform"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="#social-in"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 flex items-center justify-center text-[#202020] hover:scale-125 transition-transform"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a
              href="#social-ig"
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 flex items-center justify-center text-[#202020] hover:scale-125 transition-transform"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>

          {/* Center-Left Content Area */}
          <div className="flex-1 max-w-[540px] z-10 lg:pr-6">
            <div
              key={currentIndex}
              className={`transition-all duration-500 ease-out transform ${
                animating
                  ? direction === 'next'
                    ? 'opacity-0 translate-y-4'
                    : 'opacity-0 -translate-y-4'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] xl:text-[58px] font-bold text-[#202020] uppercase font-['Outfit',sans-serif] leading-[1.18] tracking-[0.03em]">
                <span>{slide.heading}</span>
                <br />
                <span>{slide.accent}</span>
              </h2>

              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#202020] font-normal max-w-[480px] leading-[1.75] tracking-[0.015em] my-6 sm:my-8 font-['Inter',sans-serif]">
                {slide.text}
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => scrollToHash('#about-sec')}
                  className="group relative inline-flex items-center justify-center px-9 py-3 rounded-full border border-[#202020] text-[#202020] text-[12px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase overflow-hidden transition-all duration-300 hover:bg-[#202020] hover:text-white cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span className="relative z-10">LEARN MORE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center-Right Overlapping Image */}
          <div className="w-full lg:w-[48%] xl:w-[50%] z-20 flex justify-center lg:justify-start lg:translate-x-6 xl:translate-x-10">
            <div
              key={`img-${currentIndex}`}
              className={`relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out transform ${
                animating
                  ? direction === 'next'
                    ? 'opacity-0 scale-95 translate-y-3'
                    : 'opacity-0 scale-95 -translate-y-3'
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
              style={{
                width: '100%',
                maxWidth: '540px',
                aspectRatio: '16 / 11',
                backgroundColor: '#111',
              }}
            >
              <img
                src={slide.image}
                alt={`${slide.heading} ${slide.accent}`}
                className="w-full h-full object-cover object-center grayscale contrast-125"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Far Right Vertical Up/Down Carousel Buttons */}
          <div className="flex lg:flex-col items-center justify-center gap-3.5 z-30 shrink-0 lg:ml-6 xl:ml-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#202020] hover:bg-[#fed51b] text-white hover:text-[#202020] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Previous slide"
              title="Previous slide"
            >
              <HiOutlineChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#202020] hover:bg-[#fed51b] text-white hover:text-[#202020] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Next slide"
              title="Next slide"
            >
              <HiOutlineChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
