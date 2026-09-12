import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { LiaMapMarkerAltSolid, LiaPhoneVolumeSolid, LiaPaperPlane } from 'react-icons/lia'
import { contactInfo, contactMailtoHref, contactTelHref } from '../data/content'
import { Container, Row, Col } from '../components/Grid'
import ScrollWatermark from '../components/ui/ScrollWatermark'

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
            <form className="row contact-form wow fadeInLeft flex flex-wrap -mx-[15px]" onSubmit={onSubmit}>
              <div className="w-full px-[15px]" id="result">
                {result && (
                  <div className={result.type === 'error' ? 'alert-danger' : 'alert-success'}>
                    {result.text}
                  </div>
                )}
              </div>
              <Col span={12} md={5}>
                <input type="text" name="name" placeholder="Your Name" className="form-control" value={form.name} onChange={onChange} />
                <input type="email" name="email" placeholder="Email Address *" className="form-control" value={form.email} onChange={onChange} required />
                <input type="text" name="subject" placeholder="Subject" className="form-control" value={form.subject} onChange={onChange} />
              </Col>
              <Col span={12} md={7}>
                <textarea className="form-control" name="message" rows="6" placeholder="Your Message" value={form.message} onChange={onChange} />
              </Col>
              <Col span={12}>
                <button type="submit" className="btn purple-btn rounded-pill w-full contact_btn">
                  {loading && <FaSpinner className="fa fa-spinner fa-spin mr-2 inline-block" aria-hidden="true" />}
                  Send Message
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </Col>
            </form>
          </Col>
          <Col span={12} lg={5} className="text-center lg:text-left relative">
            <div className="contact-details wow fadeInRight">
              <h4 className="heading">OUR LOCATION</h4>
              <p className="text">{contactInfo.locationNote}</p>
              <ul>
                <li>
                  <LiaMapMarkerAltSolid className="addr" />
                  {contactInfo.address}
                </li>
                <li>
                  <LiaPhoneVolumeSolid className="phone" />
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={contactTelHref(phone)}>
                      {phone}
                    </a>
                  ))}
                </li>
                <li>
                  <LiaPaperPlane className="email" />
                  <a href={contactMailtoHref()}>{contactInfo.email}</a>
                </li>
              </ul>
            </div>
            <img src="/images/contact-background.png" className="contact-background" alt="contact" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
