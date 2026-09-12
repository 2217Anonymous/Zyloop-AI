export default function ZyloopLogo({
  theme = 'dark',
  accentColor = '#6b30e9',
  size = 'md',
  className = '',
}) {
  const isDark = theme === 'dark'
  const textColor = isDark ? '#0a0a14' : '#ffffff'
  const emblemBg = isDark ? `${accentColor}18` : `${accentColor}28`
  const strokeColor = isDark ? '#0f172a' : '#ffffff'

  const iconSizes = {
    sm: 26,
    md: 35,
    lg: 44,
  }
  const iconSize = iconSizes[size] || 35

  const textSizes = {
    sm: 'text-[16px]',
    md: 'text-[21px]',
    lg: 'text-[26px]',
  }
  const textSize = textSizes[size] || 'text-[21px]'

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* ZYLOOP AI Vector Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id={`zyloop-grad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect
            width="32"
            height="32"
            rx="8"
            fill={emblemBg}
            stroke={isDark ? `${accentColor}30` : `${accentColor}50`}
            strokeWidth="1.2"
          />
          {/* Stylized geometric Z mesh */}
          <path
            d="M8 10.5h10.5l-5 11H24"
            stroke={strokeColor}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* AI Node pulses */}
          <circle cx="23" cy="10.5" r="2.4" fill={`url(#zyloop-grad-${theme})`} />
          <circle cx="9" cy="21.5" r="2.4" fill={`url(#zyloop-grad-${theme})`} />
          <circle cx="16" cy="16" r="1.4" fill={accentColor} />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex items-center tracking-tight leading-none">
        <span
          className={`font-bold font-sans ${textSize}`}
          style={{ color: textColor, letterSpacing: '-0.02em' }}
        >
          Zyloop
        </span>
        <span
          className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-white shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #3b82f6)`,
          }}
        >
          AI
        </span>
      </div>
    </div>
  )
}
