export default function HeroSlide({ slide, isActive, direction, onPrimary, onSecondary }) {
  const words = slide.headline.split(' ')

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden ${isActive ? 'z-10' : 'z-0 pointer-events-none'}`}
      aria-hidden={!isActive}
    >
      <div
        className={`absolute inset-0 transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive ? 'opacity-100 translate-x-0 scale-100' : direction > 0 ? 'opacity-0 -translate-x-8 scale-[1.02]' : 'opacity-0 translate-x-8 scale-[1.02]'
        }`}
      >
        <img
          src={slide.image}
          alt={`${slide.eyebrow} — ${slide.headline}`}
          className={`absolute inset-0 w-full h-full object-cover object-center brightness-[1.15] contrast-[1.04] saturate-[1.12] transition-transform duration-[7000ms] ease-out ${
            isActive ? 'scale-[1.08]' : 'scale-100'
          }`}
          onError={(e) => {
            if (slide.fallback) e.currentTarget.src = slide.fallback
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 25% 35%, ${slide.accentColor}26 0%, transparent 60%), radial-gradient(ellipse at 85% 65%, ${slide.accentColor}18 0%, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 100%)' }}
      />

      <div className="absolute inset-0 z-20 flex items-center pt-8 pb-12 sm:pb-16">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10">
          <div
            className={`max-w-[820px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="mb-4 sm:mb-5">
              <span
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.20em] border backdrop-blur-md shadow-lg"
                style={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderColor: slide.accentColor,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: slide.accentColor }} />
                {slide.eyebrow}
              </span>
            </div>

            <h2 className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 items-baseline text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)]">
              {words.map((word) => (
                <span
                  key={`${slide.id}-${word}`}
                  className="inline-block text-[2.4rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem] font-bold leading-[1.05] tracking-[-0.03em]"
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="mt-5 sm:mt-6 text-[17px] sm:text-[20px] font-light leading-[1.7] text-white max-w-[620px] drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
              {slide.description}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onPrimary?.(slide)}
                className="group inline-flex items-center gap-2.5 px-8 py-4 text-[14px] sm:text-[15px] font-semibold tracking-wide text-white transition-all duration-300 shadow-[0_8px_28px_rgba(0,0,0,0.5)] hover:scale-[1.03] active:scale-[0.98] rounded-lg"
                style={{ backgroundColor: slide.accentColor }}
              >
                <span>{slide.primaryCta}</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {slide.secondaryCta && (
                <button
                  type="button"
                  onClick={() => onSecondary?.(slide)}
                  className="inline-flex items-center gap-2 px-7 py-4 text-[14px] sm:text-[15px] font-medium tracking-wide text-white border border-white/50 bg-black/30 hover:bg-black/50 hover:border-white/90 transition-all duration-300 backdrop-blur-md shadow-lg rounded-lg"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{slide.secondaryCta}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
