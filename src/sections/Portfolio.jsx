import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { portfolioFilters, portfolioItems } from '../data/content'
import { Container, Row, Col } from '../components/Grid'
import Button from '../components/Button'

export default function Portfolio() {
  const [filter, setFilter] = useState('*')
  const [openIndex, setOpenIndex] = useState(-1)

  const visible = useMemo(
    () => (filter === '*' ? portfolioItems : portfolioItems.filter((p) => p.cats.includes(filter))),
    [filter],
  )

  return (
    <section className="portfolio-sec company-portfolio-section padding-top" id="portfolio">
      <Container>
        <div className="section-heading">
          <Row>
            <Col lg={6} className="wow fadeInUp text-center lg:text-left" data-wow-delay="300ms">
              <h4 className="heading">
                ZYLOOP AI <span>SUITE SOLUTIONS</span>
              </h4>
            </Col>
            <Col md={12} className="pt-5">
              <div className="cbp-l-filters-button wow fadeInUp text-center lg:text-left" data-wow-delay="350ms">
                {portfolioFilters.map((f) => (
                  <div
                    key={f.key}
                    className={`cbp-filter-item ${filter === f.key ? 'cbp-filter-item-active' : ''}`}
                    onClick={() => setFilter(f.key)}
                  >
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="portfolio-grid mt-8">
                {visible.map((item, index) => (
                  <div
                    key={item.id}
                    className={`portfolio-item cbp-item ${item.cats.join(' ')} ${index % 2 === 1 ? 'even' : ''}`}
                  >
                    <a
                      href={item.image}
                      className="cbp-caption cbp-lightbox"
                      onClick={(e) => {
                        e.preventDefault()
                        setOpenIndex(index)
                      }}
                    >
                      <div className="cbp-caption-defaultWrap">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cbp-caption-activeWrap portfolio-hover-effect flex items-end">
                        <div className="portfolio-inner-content">
                          <span></span>
                          <span></span>
                        </div>
                        <div className="hover-text">
                          <h4 className="p-hover-title">{item.title}</h4>
                          <p className="p-hover-des whitespace-pre-line">{item.desc}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              <div className="cbp-l-loadMore-button text-data wow fadeInUp active" data-wow-delay="650ms">
                <Row className="portfolio-foot-detail text-data-inner">
                  <Col span={12} lg={4} offsetLg={6} className="text-center lg:text-left pl-4">
                    <span className="p-text">Trusted by Global Enterprises</span>
                    <h4 className="p-num">2,100+</h4>
                    <span className="p-text">Active Clients Running Autonomous Agents</span>
                  </Col>
                  <Col span={12} lg={2} className="flex justify-center lg:justify-end items-center">
                    <Button variant="green" href="#contact">GET STARTED</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Lightbox
        open={openIndex >= 0}
        close={() => setOpenIndex(-1)}
        index={openIndex}
        slides={visible.map((p) => ({ src: p.image, title: p.title }))}
      />
    </section>
  )
}
