import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { LiaPhoneSolid, LiaEnvelopeSolid } from 'react-icons/lia'
import { contactInfo, contactMailtoHref, contactTelHref } from '../../data/content'
import { Container, Row, Col } from '../Grid'

const socialItems = [
  { href: '#', className: 'fb', Icon: FaFacebookF, label: 'Facebook', external: false },
  { href: '#', className: 'twit', Icon: FaTwitter, label: 'Twitter', external: false },
  { href: '#', className: 'link-in', Icon: FaLinkedinIn, label: 'LinkedIn', external: false },
  {
    href: contactInfo.instagram,
    className: 'insta',
    Icon: FaInstagram,
    label: 'Instagram',
    external: true,
  },
]

export function SocialLinks({ className = 'top-social-links' }) {
  return (
    <ul className={className}>
      {socialItems.map(({ href, className: itemClass, Icon, label, external }) => (
        <li key={label}>
          <a
            className={`link-holder ${itemClass}`}
            href={href}
            aria-label={label}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : { onClick: (e) => e.preventDefault() })}
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function MenuButton({ className = '', onClick }) {
  return (
    <button
      type="button"
      className={`sidemenu_btn sidemenu_btn-inline ${className}`.trim()}
      onClick={onClick}
      aria-label="Open side menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default function UpperNav({ onMenuOpen }) {
  return (
    <div className="upper-nav">
      <Container>
        <Row className="upper-nav-row">
          <Col span={6} className="upper-nav-left">
            <ul className="top-personal-info">
              <li>
                <a href={contactTelHref()}>
                  <LiaPhoneSolid aria-hidden="true" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={contactMailtoHref()}>
                  <LiaEnvelopeSolid aria-hidden="true" />
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </Col>
          <Col span={6} className="upper-nav-right text-right">
            <div className="upper-nav-actions">
              <SocialLinks />
              <MenuButton className="upper-nav-menu-btn" onClick={onMenuOpen} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
