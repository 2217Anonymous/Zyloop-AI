import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems, zyloopModules } from '../data/content'
import { Container, Row, Col } from './Grid'
import NavAnchor from './NavAnchor'
import ZyloopLogo from './ZyloopLogo'
import { scrollToHash } from '../hooks/useSmoothScroll'

function NavItem({ item, active, onNavigate }) {
  const [num, setNum] = useState(item.count)
  const [timer, setTimer] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const timeoutRef = useRef(null)

  const isModules = item.id === 'modules'

  const animate = () => {
    const target = item.count
    const start = target > 3 ? 0 : 8
    const duration = 800
    const from = start
    const started = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - started) / duration)
      const eased = 1 - (1 - t) * (1 - t)
      setNum(Math.ceil(from + (target - from) * eased))
      if (t < 1) {
        setTimer(requestAnimationFrame(step))
      }
    }
    if (timer) cancelAnimationFrame(timer)
    setTimer(requestAnimationFrame(step))
  }

  useEffect(() => () => timer && cancelAnimationFrame(timer), [timer])

  const handleMouseEnter = () => {
    animate()
    if (isModules) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (isModules) {
      timeoutRef.current = setTimeout(() => setDropdownOpen(false), 250)
    }
  }

  const handleModuleSelect = (mod) => {
    setDropdownOpen(false)
    window.dispatchEvent(new CustomEvent('zyloop:go-to-slide', { detail: mod.slideIndex }))
    scrollToHash('#hero-slider')
  }

  return (
    <li
      className={`nav-item relative ${active ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavAnchor
        hash={item.hash}
        home={item.id === 'home'}
        className={`nav-link ${item.id === 'home' ? 'home' : 'scroll'} link flex items-center ${active ? 'active' : ''}`}
        onClick={onNavigate}
      >
        <span className="num-prefix">0</span>
        <span className="num-nav">{num}</span>
        <span className="num-dot mr-1">.</span>
        <span className="nav-label">{item.label}</span>
        {isModules && (
          <svg
            className={`w-3 h-3 ml-1 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-purple-600' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </NavAnchor>

      {/* If this is MODULES item, drop down the 6 Zyloop AI modules */}
      {isModules && dropdownOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-2.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 mb-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100 flex items-center justify-between">
            <span>Zyloop AI Mesh</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            {zyloopModules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModuleSelect(m)}
                className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: m.color }}
                  />
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                      Zyloop {m.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal truncate">
                      {m.tag}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-700">
                  0{m.slideIndex + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}

export default function Header({ appeared, menuOpen, setMenuOpen, activeSection, isHome }) {
  return (
    <header id="home" className="cursor-light relative z-[9999]">
      <div className={`inner-header ${appeared ? 'header-appear' : ''} relative z-[9999]`}>
        {/* Full-width Signature Top Yellow Line */}
        <div
          className="top-yellow-line"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#fed51b',
            zIndex: 100,
          }}
        />

        <div className="main-navigation">
          <Container>
            <Row className="items-center">
              {/* Single Logo Container */}
              <Col span={4} lg={3} className="flex items-center">
                <Link className="navbar-brand link !flex items-center !no-underline" to="/">
                  <ZyloopLogo theme="dark" size="md" />
                </Link>
              </Col>

              {/* Navigation Menu */}
              <Col
                span={8}
                lg={9}
                className="simple-navbar items-center justify-end"
                id="simple-navbar"
              >
                <nav className="navbar navbar-expand-lg flex items-center">
                  <div className="navbar-collapse flex items-center" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto flex items-center">
                      {navItems.map((item) => (
                        <NavItem
                          key={item.id}
                          item={item}
                          active={isHome && activeSection === item.id}
                          isHome={isHome}
                        />
                      ))}
                    </ul>

                    {/* Launch / Demo CTA button */}
                    <button
                      type="button"
                      onClick={() => scrollToHash('#contact-sec')}
                      className="hidden xl:inline-flex items-center gap-2 px-5 py-2.5 ml-5 rounded-xl text-[13.5px] font-semibold text-white shadow-md hover:shadow-lg hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #6b30e9, #3b82f6)' }}
                    >
                      <span>Get Started</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </nav>
              </Col>
            </Row>
          </Container>
        </div>

        {/* SideMenu Hamburger Toggle Button */}
        <a
          href="#menu"
          className="sidemenu_btn link"
          id="sidemenu_toggle"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(true)
          }}
          aria-label="Open Zyloop AI menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </header>
  )
}
