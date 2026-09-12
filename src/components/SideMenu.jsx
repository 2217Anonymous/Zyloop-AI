import { Link } from 'react-router-dom'
import { FaYoutube, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail, HiOutlinePhone, HiOutlineArrowRight } from 'react-icons/hi'
import { navItems, zyloopModules, contactInfo, contactMailtoHref, contactTelHref } from '../data/content'
import { Container, Row, Col } from './Grid'
import NavAnchor from './NavAnchor'
import ZyloopLogo from './ZyloopLogo'
import { scrollToHash } from '../hooks/useSmoothScroll'

export default function SideMenu({ open, onClose }) {
  const handleModuleClick = (module) => {
    onClose?.()
    window.dispatchEvent(new CustomEvent('zyloop:go-to-slide', { detail: module.slideIndex }))
    scrollToHash('#hero-slider')
  }

  const handleDemoClick = (e) => {
    e.preventDefault()
    onClose?.()
    scrollToHash('#contact-sec')
  }

  return (
    <div className={`side-menu ${open ? 'side-menu-active' : 'side-menu-opacity'}`}>
      <div className="bg-overlay" onClick={onClose}></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#fed51b] z-50 pointer-events-none" />
      <div className="inner-wrapper !py-8 sm:!py-12 !px-6 sm:!px-12 md:!px-16 overflow-y-auto max-h-screen">
        <span
          className="btn-close cursor-pointer"
          id="btn_sideNavClose"
          onClick={onClose}
          aria-label="Close menu"
        >
          <i></i>
          <i></i>
        </span>

        <Container className="w-full">
          {/* Header Row */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <Link to="/" onClick={onClose} className="inline-block">
              <ZyloopLogo theme="light" size="lg" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-emerald-400 animate-pulse"></span>
                Autonomous Agentic Mesh
              </span>
            </div>
          </div>

          <Row className="w-full items-start gap-y-10">
            {/* Column 1: Zyloop AI Modules */}
            <Col span={12} lg={7} className="pr-0 lg:pr-8">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-[12px] font-mono tracking-[0.2em] uppercase text-white/60 font-semibold">
                  Zyloop AI Modules
                </h4>
                <span className="text-[11px] font-mono text-white/40">Select to preview</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {zyloopModules.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModuleClick(m)}
                    className="group relative flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 transition-all duration-300 text-left cursor-pointer"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-semibold text-white group-hover:text-white transition-colors">
                          Zyloop {m.name}
                        </span>
                        <HiOutlineArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[12px] text-white/60 font-light truncate mt-0.5">
                        {m.tag}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action Banner */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#6b30e9]/20 to-blue-600/20 border border-white/15 flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-[14px] font-semibold text-white">Deploy Zyloop AI Mesh</h5>
                  <p className="text-[12px] text-white/70">Connect intelligence to your infrastructure.</p>
                </div>
                <button
                  type="button"
                  onClick={handleDemoClick}
                  className="shrink-0 px-4 py-2 rounded-lg text-[12px] font-semibold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-md"
                >
                  Schedule Demo
                </button>
              </div>
            </Col>

            {/* Column 2: Navigation & Contact */}
            <Col span={12} lg={5} className="flex flex-col justify-between">
              <div>
                <h4 className="text-[12px] font-mono tracking-[0.2em] uppercase text-white/60 font-semibold mb-3">
                  Site Navigation
                </h4>
                <nav className="side-nav w-full">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.id} className="nav-item">
                        <NavAnchor
                          hash={item.hash}
                          home={item.id === 'home'}
                          className="!text-[16px] !font-medium text-white/80 hover:text-white flex items-center gap-2 py-1.5 transition-colors"
                          onClick={onClose}
                        >
                          <span className="text-[12px] font-mono text-white/40">0{item.count}.</span>
                          <span>{item.label}</span>
                        </NavAnchor>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Enterprise info */}
              <div className="mt-8 pt-6 border-t border-white/10 text-white">
                <div className="space-y-2 mb-4 text-[13px] text-white/75">
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="w-4 h-4 text-purple-400" />
                    <a href={contactMailtoHref()} className="hover:text-white transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                  {contactInfo.phones.map((phone) => (
                    <div key={phone} className="flex items-center gap-2">
                      <HiOutlinePhone className="w-4 h-4 text-emerald-400" />
                      <a href={contactTelHref(phone)} className="hover:text-white transition-colors">
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-[11px] text-white/40">
                  &copy; 2026 Zyloop AI Inc. Autonomous Enterprise Intelligence.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
