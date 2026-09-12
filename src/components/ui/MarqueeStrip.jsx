function MarqueeGroup({ children, className = '' }) {
  return <div className={`marquee-tier-group ${className}`.trim()}>{children}</div>
}

export function TextMarquee({ items, className = '' }) {
  return (
    <div className={`marquee-tier marquee-tier-text ${className}`.trim()} aria-hidden="true">
      <div className="marquee-tier-track marquee-tier-track-text">
        {[0, 1].map((set) => (
          <MarqueeGroup key={set}>
            {items.map((item) => (
              <span key={`${set}-${item}`} className="marquee-tier-text-item">
                <span className="marquee-tier-dot" />
                {item}
              </span>
            ))}
          </MarqueeGroup>
        ))}
      </div>
    </div>
  )
}
