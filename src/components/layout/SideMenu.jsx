import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { navItems, contactInfo, contactMailtoHref, contactTelHref } from '../../data/content'
import { Container, Row, Col } from '../Grid'
import NavAnchor from '../NavAnchor'
import { BrandLogo } from './ZLogo'

export default function SideMenu({ open, onClose }) {
  return (
    <div
      className={`side-menu side-menu-classic${open ? ' side-menu-active' : ' side-menu-opacity'}`}
      aria-hidden={!open}
    >
      <div className="bg-overlay" onClick={onClose} aria-hidden="true" />

      <div className="inner-wrapper">
        <button
          type="button"
          className="btn-close"
          id="btn_sideNavClose"
          onClick={onClose}
          aria-label="Close menu"
        />

        <Container>
          <Row className="w-full side-menu-inner-content">
            <Col span={12} className="flex justify-center items-center">
              <Link className="navbar-brand side-menu-logo" to="/" onClick={onClose}>
                <BrandLogo width={220} />
              </Link>
            </Col>

            <Col span={12} lg={8}>
              <nav className="side-nav w-full" aria-label="Side navigation">
                <ul className="navbar-nav">
                  {navItems.map((item) => (
                    <li className="nav-item" key={item.id}>
                      <NavAnchor
                        hash={item.hash}
                        home={item.id === 'home'}
                        className="nav-link scroll"
                        onClick={onClose}
                      >
                        {item.label}
                      </NavAnchor>
                    </li>
                  ))}
                </ul>
              </nav>
            </Col>

            <Col span={12} lg={4} className="flex items-center">
              <div className="side-footer text-white w-full">
                <div className="menu-company-details">
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={contactTelHref(phone)}>
                      {phone}
                    </a>
                  ))}
                  <a href={contactMailtoHref()}>{contactInfo.email}</a>
                </div>
                <ul className="social-icons-simple">
                  <li>
                    <a className="facebook-text-hvr" href="#!" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                      <FaFacebookF aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="instagram-text-hvr" href="#!" onClick={(e) => e.preventDefault()} aria-label="X">
                      <FaXTwitter aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="instagram-text-hvr" href="#!" onClick={(e) => e.preventDefault()} aria-label="YouTube">
                      <FaYoutube aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram-text-hvr"
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <FaInstagram aria-hidden="true" />
                    </a>
                  </li>
                </ul>
                <p className="text-white">&copy; 2026 ZYLOOP AI. All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
