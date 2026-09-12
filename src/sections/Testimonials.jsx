import { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import {
  FaBullhorn,
  FaUsers,
  FaHeadset,
  FaMoneyBillWave,
  FaGears,
  FaShieldHalved,
} from 'react-icons/fa6'
import { businessCategories } from '../data/content'
import { Container, Row, Col } from '../components/Grid'

const categoryIcons = {
  'sales-marketing': FaBullhorn,
  'hr-ops': FaUsers,
  'service-ops': FaHeadset,
  'finance-ops': FaMoneyBillWave,
  operations: FaGears,
  'it-security': FaShieldHalved,
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const total = businessCategories.length
  const activeCategory = businessCategories[activeIndex]
  const ActiveIcon = categoryIcons[activeCategory.id] || FaGears

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + total) % total)
    },
    [total],
  )

  const goNext = useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [isPaused, total])

  return (
    <div className="testimonial-sec category-section-compact relative" id="business-categories">
      <div className="right-overlay"></div>
      <div className="testimonial-area">
        <Container>
          <Row className="category-section-row">
            <Col
              span={12}
              lg={4}
              className="flex justify-center items-start text-center lg:text-left"
            >
              <div className="testimonial-details wow fadeInLeft">
                <span className="industry-section-kicker">Business Categories</span>
                <h4 className="heading">
                  AI FOR EVERY
                  <span>FUNCTION</span>
                </h4>
                <p className="text">
                  Deploy intelligent automation across sales, HR, finance, operations, support,
                  and IT with AI agents built for every business function.
                </p>

                <div className="category-tab-list" role="tablist" aria-label="Business categories">
                  {businessCategories.map((category, index) => {
                    const TabIcon = categoryIcons[category.id] || FaGears
                    return (
                      <button
                        key={category.id}
                        type="button"
                        role="tab"
                        aria-selected={index === activeIndex}
                        className={`category-tab${index === activeIndex ? ' is-active' : ''}`}
                        onClick={() => goTo(index)}
                      >
                        <TabIcon />
                        <span>{category.title}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Col>

            <Col span={12} lg={8}>
              <div
                className="category-split-carousel category-agent-area wow fadeInRight relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <article className="category-split-card">
                  <div className="category-split-title-wrap">
                    <div className="category-split-title-meta">
                      <p className="category-split-title-badge">{activeCategory.badge}</p>
                      <h4 key={`title-${activeIndex}`} className="category-split-title">
                        {activeCategory.title}
                      </h4>
                    </div>
                    <span className="category-split-index" aria-hidden="true">
                      {String(activeIndex + 1).padStart(2, '0')}
                      <span className="category-split-index-sep">/</span>
                      {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="category-split-body">
                    <div className="category-split-pane category-split-pane-content">
                      <div key={`content-${activeIndex}`} className="category-split-pane-inner is-down">
                        <div className="category-split-intro">
                          <span className="category-split-icon" aria-hidden="true">
                            <ActiveIcon />
                          </span>
                          <p className="category-split-desc">{activeCategory.desc}</p>
                        </div>
                        <ul className="category-split-points">
                          {activeCategory.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="category-split-pane category-split-pane-media">
                      <div key={`media-${activeIndex}`} className="category-split-pane-inner is-up">
                        <img src={activeCategory.image} alt={activeCategory.title} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className="category-split-controls">
                    <button
                      type="button"
                      className="category-split-nav-btn"
                      aria-label="Previous category"
                      onClick={goPrev}
                    >
                      <FaAngleLeft />
                    </button>
                    <div className="category-split-dots" role="tablist" aria-label="Category slides">
                      {businessCategories.map((category, index) => (
                        <button
                          key={category.id}
                          type="button"
                          aria-label={category.title}
                          className={`category-split-dot${index === activeIndex ? ' is-active' : ''}`}
                          onClick={() => goTo(index)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="category-split-nav-btn"
                      aria-label="Next category"
                      onClick={goNext}
                    >
                      <FaAngleRight />
                    </button>
                  </div>
                </article>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
