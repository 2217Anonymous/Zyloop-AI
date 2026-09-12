import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaInstagram, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Container, Row, Col } from './Grid'

const icons = [
  { Icon: FaFacebookF, dir: 'Up' },
  { Icon: FaXTwitter, dir: 'Down' },
  { Icon: FaGooglePlusG, dir: 'Up' },
  { Icon: FaLinkedinIn, dir: 'Down' },
  { Icon: FaInstagram, dir: 'Up' },
  { Icon: FaPinterestP, dir: 'Down' },
]

export default function Footer() {
  return (
    <footer className="footer-style-1">
      <Container>
        <Row className="items-center">
          <Col lg={6}>
            <div className="footer-social text-center lg:text-left">
              <ul className="list-unstyled">
                {icons.map(({ Icon, dir }, i) => (
                  <li key={i}>
                    <a className={`wow fadeIn${dir}`} href="#" onClick={(e) => e.preventDefault()}>
                      <Icon aria-hidden="true" className="inline-block" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col lg={6} className="text-center lg:text-right">
            <p className="company-about fadeIn">
              &copy; 2026 Zyloop AI Inc. Autonomous Enterprise Intelligence.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
