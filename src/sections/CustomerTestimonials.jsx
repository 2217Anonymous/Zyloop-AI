import { useCallback, useEffect, useState } from 'react'
import { FaQuoteRight } from 'react-icons/fa'
import { getSettings } from '../api/settings'
import { getTestimonials } from '../api/testimonials'
import { Container, Row, Col } from '../components/Grid'
import ContentState from '../components/ContentState'

export default function CustomerTestimonials() {
  const [enabled, setEnabled] = useState(null)
  const [items, setItems] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getSettings(), getTestimonials()])
      .then(([settings, data]) => {
        setEnabled(Boolean(settings?.testimonialsEnabled))
        if (!settings?.testimonialsEnabled) return
        const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0))
        setItems(sorted)
      })
      .catch((err) => setError(err.message || 'Unable to load testimonials'))
      .finally(() => setLoading(false))
  }, [])

  if (enabled === false) return null

  const goTo = useCallback(
    (index) => {
      if (!items.length) return
      setActiveIndex((index + items.length) % items.length)
    },
    [items.length],
  )

  useEffect(() => {
    if (items.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [items.length])

  const active = items[activeIndex]

  return (
    <div className="testimonial-sec padding-top position-relative customer-testimonials-sec" id="testimonials">
      <div className="right-overlay"></div>
      <Container>
        <div className="testimonial-area padding-top padding-bottom">
          <Container fixed>
            <Row>
              <Col span={12} lg={5} className="flex justify-center items-center text-center lg:text-left">
                <div className="testimonial-details wow fadeInLeft">
                  <h4 className="heading">
                    SATISFIED <span>CUSTOMERS</span>
                  </h4>
                  <p className="text">
                    Hear from teams using ZYLOOP AI to automate voice, CRM, and workflow operations at scale.
                  </p>
                </div>
              </Col>
              <Col span={12} lg={6} offsetLg={1}>
                <div className="testimonial-carousel wow fadeInRight">
                  <ContentState
                    loading={loading ? 'Loading testimonials…' : false}
                    error={!loading && error ? error : false}
                    empty={!loading && !error && items.length === 0}
                    emptyMessage="No testimonials published yet."
                  />

                  {!loading && !error && active && (
                    <div className="testimonial-box">
                      <div className="item text-center">
                        <div className="icon-holder">
                          <FaQuoteRight aria-hidden="true" />
                        </div>
                        <p className="text">{active.text}</p>
                        <div className="img-holder">
                          <img src={active.image} alt={active.name} />
                        </div>
                        <h4 className="user-name">{active.name}</h4>
                        <p className="customer-role">{active.role}</p>
                      </div>

                      {items.length > 1 && (
                        <div className="customer-testimonial-dots">
                          {items.map((item, index) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`customer-testimonial-dot${index === activeIndex ? ' is-active' : ''}`}
                              aria-label={`Show testimonial from ${item.name}`}
                              onClick={() => goTo(index)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  )
}
