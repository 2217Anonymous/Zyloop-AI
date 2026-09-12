import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaInstagram, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { contactInfo } from '../../data/content'
import { Container, Row, Col } from '../Grid'
import ColorLines from './ColorLines'

const icons = [
  { Icon: FaFacebookF, dir: 'Up', href: '#', external: false },
  { Icon: FaXTwitter, dir: 'Down', href: '#', external: false },
  { Icon: FaGooglePlusG, dir: 'Up', href: '#', external: false },
  { Icon: FaLinkedinIn, dir: 'Down', href: '#', external: false },
  { Icon: FaInstagram, dir: 'Up', href: contactInfo.instagram, external: true },
  { Icon: FaPinterestP, dir: 'Down', href: '#', external: false },
]

export default function SiteFooter() {
  return (
    <>
      <ColorLines />
      <footer className="footer-style-1">
        <Container>
          <Row className="items-center">
            <Col lg={6}>
              <div className="footer-social text-center lg:text-left">
                <ul className="list-unstyled">
                  {icons.map(({ Icon, dir, href, external }, i) => (
                    <li key={i}>
                      <a
                        className={`wow fadeIn${dir}`}
                        href={href}
                        {...(external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : { onClick: (e) => e.preventDefault() })}
                      >
                        <Icon aria-hidden="true" className="inline-block" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col lg={6} className="text-center lg:text-right">
              <p className="company-about fadeIn">
                &copy; 2026 ZYLOOP AI. Made with love. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}
