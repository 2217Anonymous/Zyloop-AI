import { useEffect, useRef, useState } from 'react'

export default function CircleProgress({
  value,
  label,
  color = '#f71c52',
  size = 170,
  stroke = 9,
}) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const radius = (size - stroke) / 2
  const circ = 2 * Math.PI * radius

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const start = performance.now()
        const duration = 1200
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3)
          setProgress(value * eased)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  const strokeDashoffset = circ - circ * progress

  return (
    <div className="stat-circle-wrapper" ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#edf2f7"
          strokeWidth={stroke}
        />
        {/* Animated active progress circle with SOLID color (No gradients) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Center label */}
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0f172a"
          style={{
            fontSize: '32px',
            fontWeight: '700',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </text>
      </svg>
    </div>
  )
}
