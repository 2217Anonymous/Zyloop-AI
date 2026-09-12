import { useEffect, useState } from 'react'
import { getBlogs } from '../api/blogs'
import { formatBlogDate } from '../api/client'
import { Container, Row, Col } from '../components/Grid'
import PageBanner from '../components/PageBanner'
import BlogSidebar from '../components/BlogSidebar'
import BlogFeaturedImage from '../components/BlogFeaturedImage'
import Button from '../components/Button'
import ContentState from '../components/ContentState'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data.sort((a, b) => new Date(b.date) - new Date(a.date))))
      .catch((err) => setError(err.message || 'Unable to load blogs'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <PageBanner
        title="BLOG CONTENT"
        image="/images/blogs/s-blog-slider.jpg"
      />
      <section className="main">
        <div className="blog-content padding-top padding-bottom">
          <Container>
            <Row>
              <Col span={12} lg={8} order={1} className="order-1">
                <ContentState
                  loading={loading ? 'Loading blog posts…' : false}
                  error={!loading && error ? error : false}
                  empty={!loading && !error && blogs.length === 0}
                  emptyMessage="No blog posts published yet."
                />

                <div className="main_content text-center lg:text-left">
                  {blogs.map((post) => (
                    <div className="single_blog" key={post.id}>
                      <BlogFeaturedImage
                        src={post.image}
                        alt={post.title}
                        className="single_img"
                      />
                      <div className="single_detail">
                        <p className="blog-sub-heading text-center">
                          <span></span>{(post.categories || [])[0] || 'ZYLOOP AI'}
                        </p>
                        <h2>{post.title}</h2>
                        <span className="blog-text">
                          <span>{formatBlogDate(post.date)}</span> | BY <span>{post.author}</span> |{' '}
                          {(post.categories || []).map((c, i) => (
                            <span key={c}>
                              <span>{c}</span>
                              {i < post.categories.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                        <p className="p-text">{post.excerpt}</p>
                        <Button variant="green" href={`/blog/${post.slug}`} as="a">
                          READ MORE
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col span={12} lg={4} className="side-bar order-3 lg:order-2">
                <BlogSidebar blogs={blogs} loading={loading} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </main>
  )
}
