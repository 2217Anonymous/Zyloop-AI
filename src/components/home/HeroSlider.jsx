import { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { heroVideo, marqueeTickerItems, navItems, selectSolution } from '../../data/content'
import { DEFAULT_SETTINGS } from '../../api/settings'
import { useSiteSettings } from '../../context/SiteSettingsContext'
import { BrandLogo } from '../layout/ZLogo'
import { TextMarquee } from '../ui/MarqueeStrip'
import NavAnchor from '../NavAnchor'
import VideoModal from '../VideoModal'
import { scrollToHash } from '../../hooks/useSmoothScroll'

export default function HeroSlider() {
  const { settings } = useSiteSettings()
  const videoRef = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const hero = {
    badge: settings.heroBadge || DEFAULT_SETTINGS.heroBadge,
    heading: settings.heroHeading || DEFAULT_SETTINGS.heroHeading,
    accent: settings.heroAccent || DEFAULT_SETTINGS.heroAccent,
    text: settings.heroText || DEFAULT_SETTINGS.heroText,
    primaryCta: settings.heroPrimaryCta || DEFAULT_SETTINGS.heroPrimaryCta,
    solutionId: settings.heroSolutionId || DEFAULT_SETTINGS.heroSolutionId,
    src: settings.heroVideoUrl || heroVideo.src,
    type: settings.heroVideoType || heroVideo.type,
    poster: settings.heroPosterUrl || heroVideo.poster,
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    const playVideo = () => {
      video.muted = true
      video.play().catch(() => {})
    }
    playVideo()
    video.addEventListener('canplay', playVideo)
    return () => video.removeEventListener('canplay', playVideo)
  }, [hero.src])

  const goToSolution = (solutionId) => {
    selectSolution(solutionId)
    scrollToHash('#about')
  }

  return (
    <section className="slider-area hero-cinematic" id="home" aria-label="ZYLOOP AI hero">
      <div className="hero-cinematic-stage">
        <div className="hero-cinematic-top">
          <div className="hero-cinematic-marquee">
            <TextMarquee items={marqueeTickerItems} />
          </div>
        </div>
        <video
          ref={videoRef}
          key={hero.src}
          className="hero-cinematic-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={hero.poster}
        >
          <source src={hero.src} type={hero.type || 'video/webm'} />
        </video>
        <div className="hero-cinematic-shade" aria-hidden="true"></div>

        <div className="hero-cinematic-copy">
          <span className="hero-cinematic-badge">{hero.badge}</span>
          <h1 className="hero-cinematic-title">
            <span>{hero.heading}</span>
            <span>{hero.accent}</span>
          </h1>
          <p className="hero-cinematic-text">{hero.text}</p>
          <div className="hero-cinematic-actions">
            <button
              type="button"
              className="hero-cinematic-btn hero-cinematic-btn--primary"
              onClick={() => goToSolution(hero.solutionId)}
            >
              {hero.primaryCta}
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="hero-cinematic-btn hero-cinematic-btn--ghost"
              onClick={() => setVideoOpen(true)}
            >
              <FaPlay />
              Watch Demo
            </button>
          </div>
        </div>

        <nav className="hero-bottom-nav" aria-label="Product navigation">
          <a
            className="hero-bottom-nav-logo"
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#home')
            }}
          >
            <BrandLogo width={148} />
          </a>

          <ul className="hero-bottom-nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavAnchor hash={item.hash} home={item.id === 'home'} className="hero-bottom-nav-link">
                  {item.label}
                </NavAnchor>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="hero-bottom-nav-cta"
            onClick={() => scrollToHash('#contact')}
          >
            Get Started
          </button>
        </nav>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={hero.src}
        poster={hero.poster}
      />
    </section>
  )
}
