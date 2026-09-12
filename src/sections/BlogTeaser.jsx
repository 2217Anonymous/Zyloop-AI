import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setPosts(sorted)
        setActiveIndex(0)
      })
      .catch((err) => setError(err.message || 'Unable to load blogs'))
      .finally(() => setLoading(false))
  }, [])

  const total = posts.length
  const canSlide = total > 1
  const activePost = posts[activeIndex]

  const goTo = useCallback(
    (index, dir = 'down') => {
      if (!total) return
      setDirection(dir)
      setActiveIndex((index + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1, 'up'), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1, 'down'), [activeIndex, goTo])

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

              {activePost && (
                <div key={`${activePost.id || activePost.slug}-${direction}`} className={`blog-slider-copy is-${direction}`}>
                  <p className="text blog-teaser-latest-title">{activePost.title}</p>
                  <p className="text blog-teaser-meta">
                    {formatBlogDateShort(activePost.date)}
                    {activePost.author ? ` · ${activePost.author}` : ''}
                    {activePost.categories?.[0] ? ` · ${activePost.categories[0]}` : ''}
                  </p>
                  {activePost.excerpt && <p className="text blog-teaser-excerpt">{activePost.excerpt}</p>}
                </div>
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

              {total > 0 && (
                <p className="blog-slider-count">
                  {padIndex(activeIndex + 1)} / {padIndex(total)}
                </p>
              )}

              {total > 0 && (
                <ul className="blog-slider-list">
                  {posts.map((post, index) => (
                    <li key={post.id || post.slug}>
                      <button
                        type="button"
                        className={`blog-slider-list-btn${index === activeIndex ? ' is-active' : ''}`}
                        onClick={() => goTo(index, index > activeIndex ? 'down' : 'up')}
                      >
                        <span>{padIndex(index + 1)}</span>
                        {post.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>

          <Col span={12} lg={6} offsetLg={1}>
            <div className="blog-img blog-slider-media wow fadeInRight">
              {activePost ? (
                <div key={`img-${activePost.id || activePost.slug}`} className={`blog-slider-image-frame is-${direction}`}>
                  <BlogFeaturedImage
                    src={activePost.image || '/images/blog1.png'}
                    alt={activePost.title || 'Blog post'}
                    variant="teaser"
                  />
                </div>
              ) : (
                <BlogFeaturedImage
                  src="/images/blog1.png"
                  alt="Latest design blogs"
                  variant="teaser"
                />
              )}

              {canSlide && <SliderArrows onUp={goPrev} onDown={goNext} />}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
