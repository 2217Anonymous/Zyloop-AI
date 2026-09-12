import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { contactInfo, contactMailtoHref, contactTelHref } from '../data/content'
import { Container, Row, Col } from '../components/Grid'
import ScrollWatermark from '../components/ui/ScrollWatermark'

function ContactIcon({ type }) {
  if (type === 'map') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2.25c-3.86 0-7 3.02-7 6.75 0 5.06 7 12.75 7 12.75s7-7.69 7-12.75c0-3.73-3.14-6.75-7-6.75zm0 9.15a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8z" />
      </svg>
    )
  }
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7.4 3.6c.4-.4 1.1-.5 1.6-.2l2.3 1.4c.5.3.8.9.7 1.5l-.4 2.3c-.1.4.1.9.4 1.2l1.6 1.6c.3.3.8.5 1.2.4l2.3-.4c.6-.1 1.2.2 1.5.7l1.4 2.3c.3.5.2 1.2-.2 1.6l-1.3 1.3c-.8.8-2 1.1-3.1.6-2.5-1.1-4.8-2.8-6.7-5-1.8-2.1-3.2-4.5-4-7.1-.4-1.1-.1-2.3.7-3.1l1.4-1.5z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4.5 5.25h15A1.5 1.5 0 0 1 21 6.75v10.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5zm.7 1.5 6.25 4.47a1 1 0 0 0 1.1 0L18.8 6.75H5.2z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const empty = !form.name || !form.email
    setLoading(true)
    setTimeout(() => {
      if (empty) {
        setResult({ type: 'error', text: 'Please fill in all required fields.' })
      } else {
        setResult({ type: 'success', text: 'Message sent successfully. We will contact you soon.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      }
      setLoading(false)
    }, 600)
  }

  return (
    <section className="contact-sec padding-top padding-bottom relative overflow-hidden" id="contact">
      <ScrollWatermark text="GET IN TOUCH" className="contact-scroll-watermark" range={450} />
      <Container className="relative z-10">
        <Row>
          <Col span={12} lg={7}>
            <h4 className="heading text-center lg:text-left">GET IN TOUCH</h4>
            <form className="contact-form wow fadeInLeft" onSubmit={onSubmit}>
              <div id="result">
                {result && (
                  <div className={result.type === 'error' ? 'alert-danger' : 'alert-success'}>
                    {result.text}
                  </div>
                )}
              </div>
              <input type="text" name="name" placeholder="Your Name" className="form-control" value={form.name} onChange={onChange} />
              <input type="email" name="email" placeholder="Email Address *" className="form-control" value={form.email} onChange={onChange} required />
              <input type="text" name="subject" placeholder="Subject" className="form-control" value={form.subject} onChange={onChange} />
              <textarea className="form-control" name="message" rows="5" placeholder="Your Message" value={form.message} onChange={onChange} />
              <button type="submit" className="btn purple-btn rounded-pill w-full contact_btn">
                {loading && <FaSpinner className="fa fa-spinner fa-spin mr-2 inline-block" aria-hidden="true" />}
                Send Message
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </form>
          </Col>
          <Col span={12} lg={5} className="text-center lg:text-left relative">
            <div className="contact-details wow fadeInRight">
              <h4 className="heading">OUR LOCATION</h4>
              <p className="text">{contactInfo.locationNote}</p>
              <div className="contact-map">
                <iframe
                  title="ZYLOOP AI office on Google Maps"
                  src={contactInfo.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <ul>
                <li>
                  <span className="contact-icon contact-icon--addr" aria-hidden="true">
                    <ContactIcon type="map" />
                  </span>
                  <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer">
                    {contactInfo.address}
                  </a>
                </li>
                <li>
                  <span className="contact-icon contact-icon--phone" aria-hidden="true">
                    <ContactIcon type="phone" />
                  </span>
                  <a href={contactTelHref()}>{contactInfo.phone}</a>
                </li>
                <li>
                  <span className="contact-icon contact-icon--email" aria-hidden="true">
                    <ContactIcon type="email" />
                  </span>
                  <a href={contactMailtoHref()}>{contactInfo.email}</a>
                </li>
              </ul>
            </div>
            <img src="/images/contact-background.png" className="contact-background" alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
