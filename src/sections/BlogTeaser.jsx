import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, EffectFade } from 'swiper/modules'
import { getBlogs } from '../api/blogs'
import { formatBlogDateShort } from '../api/client'
import { Container, Row, Col } from '../components/Grid'
import ContentState from '../components/ContentState'
import SliderArrows from '../components/home/SliderArrows'
import BlogFeaturedImage from '../components/BlogFeaturedImage'

function padIndex(value) {
  return String(value).padStart(2, '0')
}

export default function BlogTeaser() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [textSwiper, setTextSwiper] = useState(null)
  const [imgSwiper, setImgSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setPosts(sorted)
      })
      .catch((err) => setError(err.message || 'Unable to load blogs'))
      .finally(() => setLoading(false))
  }, [])

  const canSlide = posts.length > 1
  const activePost = posts[activeIndex]

  return (
    <section className="blog-sec blog-slider-sec" id="blog">
      <div className="left-overlay" aria-hidden="true"></div>
      <Container className="relative">
        <div className="blog-inner-overlay" aria-hidden="true"></div>
        <Row className="blog-area">
          <Col
            span={12}
            lg={5}
            className="flex items-center justify-center lg:justify-start text-center lg:text-left"
          >
            <div className="blog-detail wow fadeInLeft">
              <p className="blog-slider-kicker">Insights</p>
              <h4 className="heading">
                Latest <span>Design Blogs</span>
              </h4>

              <ContentState
                loading={loading ? 'Loading blogs…' : false}
                error={!loading && error ? error : false}
                empty={!loading && !error && posts.length === 0}
                emptyMessage="No blog posts published yet."
              />

              {!loading && !error && posts.length > 0 && (
                <Swiper
                  modules={[Controller, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  onSwiper={setTextSwiper}
                  controller={{ control: imgSwiper }}
                  allowTouchMove={canSlide}
                  loop={canSlide}
                  speed={600}
                  autoHeight
                  className="blog-text-swiper"
                  onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
                >
                  {posts.map((post) => (
                    <SwiperSlide key={post.id || post.slug}>
                      <div className="blog-slider-copy">
                        <p className="text blog-teaser-latest-title">{post.title}</p>
                        <p className="text blog-teaser-meta">
                          {formatBlogDateShort(post.date)}
                          {post.author ? ` · ${post.author}` : ''}
                          {post.categories?.[0] ? ` · ${post.categories[0]}` : ''}
                        </p>
                        {post.excerpt && <p className="text blog-teaser-excerpt">{post.excerpt}</p>}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {!loading && !error && posts.length === 0 && (
                <p className="text">
                  Insights on agentic AI, voice automation, and enterprise workflow transformation.
                </p>
              )}

              {activePost ? (
                <Link className="btn anim-btn rounded-pill" to={`/blog/${activePost.slug}`}>
                  Read Article
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              ) : (
                <Link className="btn anim-btn rounded-pill" to="/blog">
                  View All Blogs
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              )}

              {posts.length > 0 && (
                <p className="blog-slider-count">
                  {padIndex(activeIndex + 1)} / {padIndex(posts.length)}
                </p>
              )}
            </div>
          </Col>

          <Col span={12} lg={6} offsetLg={1}>
            <div className="blog-img blog-slider-media wow fadeInRight">
              {posts.length > 0 ? (
                <Swiper
                  modules={[Controller]}
                  onSwiper={setImgSwiper}
                  controller={{ control: textSwiper }}
                  direction="vertical"
                  speed={600}
                  slidesPerView={1}
                  allowTouchMove={canSlide}
                  loop={canSlide}
                  className="blog-img-swiper"
                >
                  {posts.map((post) => (
                    <SwiperSlide key={`img-${post.id || post.slug}`}>
                      <BlogFeaturedImage
                        src={post.image || '/images/blog1.png'}
                        alt={post.title || 'Blog post'}
                        variant="teaser"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <BlogFeaturedImage
                  src="/images/blog1.png"
                  alt="Latest design blogs"
                  variant="teaser"
                />
              )}

              {canSlide && (
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
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
