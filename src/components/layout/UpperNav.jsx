import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { LiaPhoneSolid, LiaEnvelopeSolid } from 'react-icons/lia'
import { contactInfo, contactMailtoHref, contactTelHref } from '../../data/content'
import { Container } from '../Grid'

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
      <div className="upper-nav-accent" aria-hidden="true" />
      <Container>
        <div className="upper-nav-bar">
          <ul className="top-personal-info">
            <li>
              <a href={contactTelHref()}>
                <LiaPhoneSolid aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
            </li>
            <li>
              <a href={contactMailtoHref()}>
                <LiaEnvelopeSolid aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
            </li>
          </ul>
          <div className="upper-nav-actions">
            <SocialLinks />
            <MenuButton className="upper-nav-menu-btn" onClick={onMenuOpen} />
          </div>
        </div>
      </Container>
    </div>
  )
}
