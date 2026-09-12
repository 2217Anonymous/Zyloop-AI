import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import {
  FaCalendarCheck,
  FaTruck,
  FaShieldHalved,
  FaBuilding,
  FaChartLine,
  FaUsers,
  FaHotel,
} from 'react-icons/fa6'
import { industryAgents } from '../data/content'
import { Container, Row, Col } from '../components/Grid'

const agentIcons = {
  appointments: FaCalendarCheck,
  logistics: FaTruck,
  insurance: FaShieldHalved,
  'real-estate': FaBuilding,
  finance: FaChartLine,
  hr: FaUsers,
  hospitality: FaHotel,
}

export default function Team() {
  const swiperRef = useRef(null)

  return (
    <section className="team-sec relative" id="industry-agents">
      <div className="left-overlay"></div>
      <Container>
        <Row className="inner-team-sec padding-top padding-bottom">
          <Col span={12} lg={4} className="text-center lg:text-left">
            <div className="team-detail wow fadeInLeft">
              <span className="industry-section-kicker">Industry AI Agents</span>
              <h4 className="heading">
                ZYLOOP AI FOR <span>EVERY BUSINESS</span>
              </h4>
              <p className="text">
                Powered by our native ecosystem, ZYLOOP AI deploys intelligent agents that plan,
                decide, and execute autonomously across critical industries.
              </p>
            </div>
          </Col>
          <Col span={12} lg={8}>
            <div className="team-area industry-agent-area wow fadeInRight relative">
              <Swiper
                modules={[Autoplay]}
                onSwiper={(s) => {
                  swiperRef.current = s
                }}
                loop
                speed={500}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                spaceBetween={24}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  992: { slidesPerView: 2 },
                }}
                className="team-carousel industry-agent-carousel content-carousel"
              >
                {industryAgents.map((agent) => {
                  const Icon = agentIcons[agent.id] || FaChartLine
                  return (
                    <SwiperSlide key={agent.id}>
                      <div className="item">
                        <article className="content-carousel-card">
                          <span className="content-carousel-icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <div className="content-carousel-info">
                            <p className="content-carousel-badge">{agent.badge}</p>
                            <h4 className="content-carousel-title">{agent.title}</h4>
                            <p className="content-carousel-desc">{agent.desc}</p>
                          </div>
                        </article>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              <a
                href="#prev"
                className="content-carousel-nav content-carousel-prev"
                aria-label="Previous slide"
                onClick={(e) => {
                  e.preventDefault()
                  swiperRef.current?.slidePrev()
                }}
              >
                <FaAngleLeft />
              </a>
              <a
                href="#next"
                className="content-carousel-nav content-carousel-next"
                aria-label="Next slide"
                onClick={(e) => {
                  e.preventDefault()
                  swiperRef.current?.slideNext()
                }}
              >
                <FaAngleRight />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
