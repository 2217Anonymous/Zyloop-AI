import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export default function BlogPostNav({ prev, next }) {
  const prevTo = prev ? `/blog/${prev.slug}` : '/blog'
  const nextTo = next ? `/blog/${next.slug}` : '/blog'

  return (
    <nav className="blog-post-nav" aria-label="Blog post navigation">
      <div className="blog-post-nav-grid">
        <Link to={prevTo} className="blog-post-nav-item blog-post-nav-item--prev">
          <span className="blog-post-nav-arrow" aria-hidden="true">
            <FaAngleLeft />
          </span>
          <div className="blog-post-nav-copy">
            <span className="blog-post-nav-label">Previous Post</span>
            <h5>{prev?.title || 'Back to Blog'}</h5>
          </div>
        </Link>

        <Link to={nextTo} className="blog-post-nav-item blog-post-nav-item--next">
          <div className="blog-post-nav-copy">
            <span className="blog-post-nav-label">Next Post</span>
            <h5>{next?.title || 'Back to Blog'}</h5>
          </div>
          <span className="blog-post-nav-arrow" aria-hidden="true">
            <FaAngleRight />
          </span>
        </Link>
      </div>
    </nav>
  )
}
