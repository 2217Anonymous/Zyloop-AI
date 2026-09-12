import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, EffectFade } from 'swiper/modules'
import { heroVideo, slides } from '../../data/content'
import { Container, Row, Col } from '../Grid'
import SliderArrows from './SliderArrows'
import VideoModal from '../VideoModal'
import useMouseParallax from '../../hooks/useMouseParallax'
import { scrollToHash } from '../../hooks/useSmoothScroll'

export default function HeroSlider() {
  const [textSwiper, setTextSwiper] = useState(null)
  const [imgSwiper, setImgSwiper] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useMouseParallax('.slider-area')

  return (
    <section className="slider-area">
      <div className="bg-overlay"></div>
      <Container className="relative">
        <div className="inner-bg-overlay"></div>
        <Row>
          <Col
            span={12}
            lg={6}
            className="slider-detail text-center lg:text-left wow fadeInLeft"
            data-wow-delay=".8s"
          >
            <Swiper
              modules={[Controller, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSwiper={setTextSwiper}
              controller={{ control: imgSwiper }}
              allowTouchMove={false}
              speed={600}
              autoHeight
              className="hero-text-swiper"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.heading}>
                  <div className="slider-slide">
                    <div className="slider-inner-content">
                      <h4 className="slide-heading">
                        {slide.heading} <span>{slide.accent}</span>
                      </h4>
                      <p className="slide-text">{slide.text}</p>
                      <span>
                        <a
                          className="btn anim-btn rounded-pill scroll"
                          href="#about"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToHash('#about')
                          }}
                        >
                          LEARN MORE
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          <Col
            span={12}
            lg={6}
            className="slider-img wow fadeInRight"
            data-wow-delay=".8s"
          >
            <div className="hero-image-frame" data-depth="0.1">
              <Swiper
                modules={[Controller]}
                onSwiper={setImgSwiper}
                controller={{ control: textSwiper }}
                direction="vertical"
                speed={600}
                slidesPerView={1}
                className="hero-img-swiper"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.image}>
                    <div className="img-slide">
                      <img src={slide.image} alt={`${slide.heading} ${slide.accent}`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                className="hero-video-play"
                onClick={() => setVideoOpen(true)}
                aria-label="Play demo video"
              >
                <span className="hero-video-play__overlay" aria-hidden="true"></span>
                <span className="hero-video-play__icon-wrap" aria-hidden="true">
                  <FaPlay className="hero-video-play__icon" />
                </span>
              </button>
            </div>
          </Col>
        </Row>

        <SliderArrows
          onUp={() => {
            imgSwiper?.slidePrev()
            textSwiper?.slidePrev()
          }}
          onDown={() => {
            imgSwiper?.slideNext()
            textSwiper?.slideNext()
          }}
        />
      </Container>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={heroVideo.src}
        poster={heroVideo.poster}
      />
    </section>
  )
}
