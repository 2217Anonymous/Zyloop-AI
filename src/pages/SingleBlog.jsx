import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { getBlogBySlug, getBlogs } from '../api/blogs'
import { Container } from '../components/Grid'
import BlogFeaturedImage from '../components/BlogFeaturedImage'
import BlogCommentForm from '../components/BlogCommentForm'
import ContentState from '../components/ContentState'
import { BlogContentBody } from '../utils/blogContent'
import Seo from '../components/Seo'
import { articleJsonLd, blogSeo, breadcrumbJsonLd } from '../data/seo'

function formatDetailDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function SingleBlog() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([getBlogBySlug(slug), getBlogs()])
      .then(([blog, blogs]) => {
        if (!blog) throw new Error('Blog post not found')
        setPost(blog)
        setGallery(
          blogs
            .filter((item) => item.slug !== blog.slug && item.image)
            .slice(0, 2)
            .map((item) => item.image),
        )
      })
      .catch((err) => setError(err.message || 'Unable to load blog post'))
      .finally(() => setLoading(false))
  }, [slug])

  const category = (post?.categories || [])[0] || 'ZYLOOP AI'
  const quote = post?.excerpt || ''

  return (
    <main className="blog-detail-page">
      {post && (
        <Seo
          {...blogSeo(post)}
          jsonLd={[
            articleJsonLd(post),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ]}
        />
      )}
      <section className="blog-detail-wrap">
        <Container>
          <ContentState
            loading={loading ? 'Loading blog post…' : false}
            error={!loading && error ? error : false}
          />

          {!loading && !error && post && (
            <article className="blog-detail-article">
              <p className="blog-detail-kicker">{category}</p>
              <h1 className="blog-detail-title">{post.title}</h1>
              <p className="blog-detail-meta">
                By {post.author}
                <span>/</span>
                {formatDetailDate(post.date)}
                <span>/</span>
                (0) Comment
              </p>

              {post.image && (
                <div className="blog-detail-hero">
                  <BlogFeaturedImage src={post.image} alt={post.title} />
                </div>
              )}

              <div className="blog-detail-copy">
                {post.excerpt && <p className="blog-detail-lead">{post.excerpt}</p>}
                <BlogContentBody content={post.content || ''} className="blog-detail-text" />

                {quote && (
                  <blockquote className="blog-detail-quote">
                    <span className="blog-detail-quote-mark" aria-hidden="true">
                      “
                    </span>
                    <p>{quote}</p>
                    <cite>{post.author}</cite>
                  </blockquote>
                )}
              </div>

              {gallery.length > 0 && (
                <div className={`blog-detail-gallery blog-detail-gallery--${gallery.length}`}>
                  {gallery.map((src) => (
                    <BlogFeaturedImage key={src} src={src} alt="" />
                  ))}
                </div>
              )}

              <div className="blog-detail-footer">
                <p className="blog-detail-tags-line">
                  <strong>Tags:</strong>
                  {(post.tags || []).join(', ') || category}
                </p>
                <div className="blog-detail-share">
                  <strong>Share This:</strong>
                  <a href="#" aria-label="Share on Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" aria-label="Share on X">
                    <FaXTwitter />
                  </a>
                  <a href="#" aria-label="Share on LinkedIn">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" aria-label="Share on Pinterest">
                    <FaPinterestP />
                  </a>
                </div>
              </div>

              <BlogCommentForm variant="editorial" />

              <p className="blog-detail-back">
                <Link to="/blog">← Back to Blog List</Link>
              </p>
            </article>
          )}
        </Container>
      </section>
    </main>
  )
}
