import { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { heroVideo, marqueeTickerItems, navItems, selectSolution } from '../../data/content'
import { BrandLogo } from '../layout/ZLogo'
import { TextMarquee } from '../ui/MarqueeStrip'
import NavAnchor from '../NavAnchor'
import VideoModal from '../VideoModal'
import { scrollToHash } from '../../hooks/useSmoothScroll'

const heroContent = {
  badge: 'Zyloop Automate',
  heading: 'Automate What',
  accent: 'Matters',
  text: 'Build intelligent workflows and let Zyloop handle the repetitive work across your business systems.',
  primaryCta: 'Explore Automate',
  solutionId: 'zyloopflow',
}

export default function HeroSlider() {
  const videoRef = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)

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
  }, [])

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
          className="hero-cinematic-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideo.poster}
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
        <div className="hero-cinematic-shade" aria-hidden="true"></div>

        <div className="hero-cinematic-copy">
          <span className="hero-cinematic-badge">{heroContent.badge}</span>
          <h1 className="hero-cinematic-title">
            <span>{heroContent.heading}</span>
            <span>{heroContent.accent}</span>
          </h1>
          <p className="hero-cinematic-text">{heroContent.text}</p>
          <div className="hero-cinematic-actions">
            <button
              type="button"
              className="hero-cinematic-btn hero-cinematic-btn--primary"
              onClick={() => goToSolution(heroContent.solutionId)}
            >
              {heroContent.primaryCta}
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
        src={heroVideo.src}
        poster={heroVideo.poster}
      />
    </section>
  )
}
