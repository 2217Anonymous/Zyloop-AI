import { useEffect, useState } from 'react'
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
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const section = document.getElementById('comparison')
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '-12% 0px -12% 0px', threshold: 0.08 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <aside
      className={`floating-contact-bar${hidden ? ' is-section-hidden' : ''}`}
      aria-label="Quick contact links"
      aria-hidden={hidden}
    >
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
