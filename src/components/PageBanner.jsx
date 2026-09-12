import { useRef } from 'react'
import { Container, Row, Col } from './Grid'

export default function PageBanner({ title, image }) {
  const imgRef = useRef(null)

  const onParallax = (e) => {
    if (window.innerWidth <= 780 || !imgRef.current) return
    const depth = 0.1
    const x = (e.pageX * -depth) / 4
    const y = (e.pageY * -depth) / 4
    imgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  return (
    <section id="slider-sec" className="slider-sec page-banner" onMouseMove={onParallax}>
      <div className="page-banner-side page-banner-side-left" aria-hidden="true" />
      <div className="page-banner-side page-banner-side-right" aria-hidden="true" />
      <div className="overlay"></div>
      <Container>
        <Row className="relative slider-row">
          <div className="inner-overlay"></div>
          <Col span={12} lg={6} className="flex items-center text-center lg:text-left">
            <div className="inner-slider-content">
              <h4>{title}</h4>
            </div>
          </Col>
          <Col span={12} lg={6} className="page-banner-image-col">
            <img ref={imgRef} src={image} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
