import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../api/blogs'
import { Container } from '../components/Grid'
import BlogSidebar from '../components/BlogSidebar'
import BlogFeaturedImage from '../components/BlogFeaturedImage'
import ContentState from '../components/ContentState'
import Seo from '../components/Seo'
import { breadcrumbJsonLd, seoPages } from '../data/seo'

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
    <main className="blog-list-page">
      <Seo
        {...seoPages.blog}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <section className="blog-list-hero">
        <Container>
          <h1 className="blog-list-hero-title">
            AI Automation
            <span>Blog</span>
          </h1>
          <p className="blog-list-hero-lead">
            Guides on WhatsApp automation, agentic AI, CRM workflows, and enterprise operations from ZYLOOP AI.
          </p>
        </Container>
      </section>

      <section className="blog-list-body">
        <Container>
          <div className="blog-list-shell">
            <div className="blog-list-main">
              <ContentState
                loading={loading ? 'Loading blog posts…' : false}
                error={!loading && error ? error : false}
                empty={!loading && !error && blogs.length === 0}
                emptyMessage="No blog posts published yet."
              />

              <div className="blog-list-feed">
                {blogs.map((post) => (
                  <article className="blog-list-card" key={post.id}>
                    <p className="blog-list-card-date">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h2 className="blog-list-card-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className="blog-list-card-excerpt">{post.excerpt}</p>}
                    {post.image && (
                      <Link to={`/blog/${post.slug}`} className="blog-list-card-media">
                        <BlogFeaturedImage src={post.image} alt={post.title} className="single_img" />
                      </Link>
                    )}
                    <Link className="blog-list-card-more" to={`/blog/${post.slug}`}>
                      Read More <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <aside className="blog-list-aside">
              <div className="blog-list-aside-inner">
                <BlogSidebar blogs={blogs} loading={loading} variant="list" />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
