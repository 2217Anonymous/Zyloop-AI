import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/content'
import NavAnchor from '../NavAnchor'
import { SocialLinks } from './UpperNav'
import { BrandLogo } from './ZLogo'

function isNavActive(item, isHome, activeSection, pathname) {
  if (isHome) return activeSection === item.id
  if (item.id === 'blog') return pathname.startsWith('/blog')
  if (item.id === 'contact') return pathname.startsWith('/contact')
  return false
}

export default function MainNav({ activeSection, isHome, onMenuOpen }) {
  const { pathname } = useLocation()

  return (
    <div className="main-navigation">
        <div className="main-nav-bar">
          <Link className="navbar-brand site-brand-logo" to="/" aria-label="ZYLOOP AI Home">
            <BrandLogo width={190} />
          </Link>

          <nav className="site-primary-nav" aria-label="Primary">
            <ul className="navbar-nav site-main-nav">
              {navItems.map((item) => {
                const active = isNavActive(item, isHome, activeSection, pathname)
                return (
                  <li key={item.id} className={`nav-item${active ? ' active' : ''}`}>
                    <NavAnchor
                      hash={item.hash}
                      home={item.id === 'home'}
                      className={`nav-link scroll${active ? ' active' : ''}`}
                    >
                      {item.label}
                    </NavAnchor>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="main-nav-actions">
            <SocialLinks className="top-social-links fixed-nav-links" />
            <NavAnchor hash="#contact" className="site-nav-cta">
              Get Started
            </NavAnchor>
            <button
              type="button"
              className="site-menu-toggle"
              id="sidemenu_toggle"
              onClick={onMenuOpen}
              aria-label="Open side menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
    </div>
  )
}
