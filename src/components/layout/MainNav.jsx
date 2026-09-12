import { Link } from 'react-router-dom'
import { navItems } from '../../data/content'
import { Container, Row, Col } from '../Grid'
import NavAnchor from '../NavAnchor'
import { SocialLinks } from './UpperNav'
import { BrandLogo } from './ZLogo'

function navItemClass(index, isHome, activeSection, itemId) {
  const active = isHome && activeSection === itemId
  if (!active) return ''
  if ((index + 1) % 3 === 0) return 'active active-purple'
  if ((index + 1) % 2 === 0) return 'active active-green'
  return 'active active-red'
}

export default function MainNav({ activeSection, isHome, onMenuOpen }) {
  return (
    <div className="main-navigation">
      <Container>
        <Row>
          <Col span={5} lg={4} className="logo-col">
            <Link className="navbar-brand simple-nav-logo" to="/" aria-label="ZYLOOP AI Home">
              <BrandLogo width={310} />
            </Link>
            <Link className="navbar-brand fixed-nav-logo !no-underline" to="/" aria-label="ZYLOOP AI Home">
              <BrandLogo width={200} />
            </Link>
          </Col>
          <Col span={7} lg={8} className="simple-navbar flex items-center justify-end">
            <nav className="navbar navbar-expand-lg flex items-center">
              <div className="navbar-collapse flex items-center justify-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto flex items-center site-main-nav">
                  {navItems.map((item, index) => (
                    <li
                      key={item.id}
                      className={`nav-item ${navItemClass(index, isHome, activeSection, item.id)}`}
                    >
                      <NavAnchor
                        hash={item.hash}
                        home={item.id === 'home'}
                        className={`nav-link scroll ${navItemClass(index, isHome, activeSection, item.id)}`}
                      >
                        {item.label}
                      </NavAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <SocialLinks className="top-social-links fixed-nav-links" />
            <button
              type="button"
              className="sidemenu_btn sidemenu_btn-inline sidemenu_btn-compact"
              id="sidemenu_toggle"
              onClick={onMenuOpen}
              aria-label="Open side menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
