import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { contactInfo, contactMailtoHref, contactTelHref } from '../data/content'

const items = [
  {
    id: 'whatsapp',
    label: 'Chat on WhatsApp',
    href: contactInfo.whatsapp,
    Icon: FaWhatsapp,
    className: 'floating-contact-btn--whatsapp',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Follow on Instagram',
    href: contactInfo.instagram,
    Icon: FaInstagram,
    className: 'floating-contact-btn--instagram',
    external: true,
  },
  {
    id: 'phone',
    label: 'Call us',
    href: contactTelHref(),
    Icon: FaPhoneAlt,
    className: 'floating-contact-btn--phone',
  },
  {
    id: 'email',
    label: 'Email us',
    href: contactMailtoHref(),
    Icon: FaEnvelope,
    className: 'floating-contact-btn--email',
  },
]

export default function FloatingContactBar() {
  return (
    <aside className="floating-contact-bar" aria-label="Quick contact links">
      {items.map(({ id, label, href, Icon, className, external }) => (
        <a
          key={id}
          href={href}
          className={`floating-contact-btn ${className}`}
          aria-label={label}
          title={label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </aside>
  )
}
