import { useEffect, useState } from 'react'
import {
  LiaWhatsapp,
  LiaHospitalSolid,
  LiaWalletSolid,
  LiaUsersSolid,
  LiaGraduationCapSolid,
  LiaBoltSolid,
} from 'react-icons/lia'
import { aboutSolutions } from '../data/content'

const iconMap = {
  whatsapp: LiaWhatsapp,
  hospital: LiaHospitalSolid,
  wallet: LiaWalletSolid,
  users: LiaUsersSolid,
  graduation: LiaGraduationCapSolid,
  bolt: LiaBoltSolid,
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = aboutSolutions[activeIndex] || aboutSolutions[0]

  useEffect(() => {
    const onSelect = (event) => {
      const nextIndex = aboutSolutions.findIndex((item) => item.id === event.detail?.id)
      if (nextIndex >= 0) setActiveIndex(nextIndex)
    }

    window.addEventListener('zyloop:select-solution', onSelect)
    return () => window.removeEventListener('zyloop:select-solution', onSelect)
  }, [])

  return (
    <section className="about-sec relative" id="about">
      <div className="about-custom-wrapper">
        {/* ── LEFT: Purple Column (Dynamic Content) - Not full width, aligned with container ── */}
        <div className="about-purple-box">
          <div className="purple-content-inner" key={current.id}>
            {/* Tagline */}
            <div className="about-kicker-wrap">
              <span className="about-content-kicker">{current.tagline}</span>
            </div>

            {/* Title */}
            <h2 className="about-content-title">{current.name}</h2>

            {/* About Block */}
            <div className="about-content-block">
              <h5 className="about-content-subhead">ABOUT</h5>
              <p className="about-content-text">{current.about}</p>
            </div>

            {/* Key Features Block */}
            <div className="about-content-block">
              <h5 className="about-content-subhead">KEY FEATURES</h5>
              <ul className="about-content-features">
                {current.features.map((feature, i) => (
                  <li key={i} className="about-feature-row">
                    <span className="about-check-bullet">✓</span>
                    <span className="about-feature-label">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="about-content-btn-wrap">
              <a href="#comparison" className="about-explore-btn">
                EXPLORE SOLUTIONS
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Green Column (Full width, Header Title + 6 Large Icons in 2 Rows) ── */}
        <div className="about-green-box">
          {/* Header Title for Green Section */}
          <div className="about-green-title-area">
            <span className="about-green-kicker">ENTERPRISE AGENTIC SUITE</span>
            <h3 className="about-green-heading">ZYLOOP AI SOLUTIONS</h3>
            <p className="about-green-sub">
              Select any business module below to explore its architecture, capabilities, and automated integrations.
            </p>
          </div>

          {/* 6 Icons arranged in exactly 2 Rows (3 columns x 2 rows) taking full width */}
          <div className="about-green-icons-grid" role="tablist">
            {aboutSolutions.map((item, idx) => {
              const Icon = iconMap[item.icon]
              const isActive = idx === activeIndex
              return (
                <div
                  key={item.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  className={`clean-service-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveIndex(idx)
                    }
                  }}
                >
                  <div className="clean-icon-holder">
                    <Icon className="clean-icon-svg" aria-hidden="true" />
                  </div>
                  <h4 className="clean-card-heading">{item.name}</h4>
                  <p className="clean-card-desc">{item.subtitle}</p>
                  {isActive && <div className="clean-active-indicator" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
