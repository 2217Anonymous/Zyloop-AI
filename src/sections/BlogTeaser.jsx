import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../api/blogs'
import { formatBlogDateShort } from '../api/client'
import { Container, Row, Col } from '../components/Grid'
import ContentState from '../components/ContentState'
import BlogFeaturedImage from '../components/BlogFeaturedImage'

export default function BlogTeaser() {
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setLatest(sorted[0] || null)
      })
      .catch((err) => setError(err.message || 'Unable to load latest blog'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="blog-sec" id="blog">
      <div className="left-overlay" aria-hidden="true"></div>
      <Container className="relative">
        <div className="blog-inner-overlay" aria-hidden="true"></div>
        <Row className="blog-area">
          <Col span={12} lg={5} className="flex items-center justify-center lg:justify-start text-center lg:text-left">
            <div className="blog-detail wow fadeInLeft">
              <h4 className="heading">
                LATEST <span>DESIGN BLOGS</span>
              </h4>

              <ContentState
                loading={loading ? 'Loading latest blog…' : false}
                error={!loading && error ? error : false}
                empty={!loading && !error && !latest}
                emptyMessage="No blog posts published yet."
              />

              {!loading && !error && latest && (
                <>
                  <p className="text blog-teaser-latest-title">{latest.title}</p>
                  <p className="text blog-teaser-meta">
                    {formatBlogDateShort(latest.date)} · {latest.author}
                  </p>
                  {latest.excerpt && (
                    <p className="text blog-teaser-excerpt">{latest.excerpt}</p>
                  )}
                </>
              )}

              {!loading && !error && !latest && (
                <p className="text">
                  Insights on agentic AI, voice automation, and enterprise workflow transformation.
                </p>
              )}

              <Link className="btn pink-btn rounded-pill" to="/blog">
                LEARN MORE
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
          </Col>
          <Col span={12} lg={6} offsetLg={1}>
            <div className="blog-img wow fadeInRight">
              <BlogFeaturedImage
                src={latest?.image || '/images/blog1.png'}
                alt={latest?.title || 'Latest design blogs'}
                variant="teaser"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
