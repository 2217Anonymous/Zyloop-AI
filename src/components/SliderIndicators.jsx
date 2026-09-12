export default function SliderIndicators({
  count,
  activeIndex,
  progress,
  onSelect,
  accentColor,
}) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`relative h-[3px] overflow-hidden cursor-pointer focus-visible:outline-none rounded-full transition-all duration-500 ease-out ${
              isActive ? 'w-10 sm:w-14' : 'w-4 sm:w-5 bg-white/30 hover:bg-white/60'
            }`}
          >
            {!isActive && <span className="absolute inset-0 bg-white/30 group-hover:bg-white/60 rounded-full" />}
            {isActive && (
              <>
                <span className="absolute inset-0 rounded-full bg-slate-200" />
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    width: `${progress}%`,
                    transition: 'width 80ms linear',
                  }}
                />
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
