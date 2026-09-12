import BlogFeaturedImage from '../../components/BlogFeaturedImage'
import BlogImageFrame from '../../components/BlogImageFrame'
import { formatBlogDate } from '../../api/client'
import { BlogContentBody } from '../../utils/blogContent'

export default function BlogLivePreview({ form }) {
  const categories = form.categories
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const tags = form.tags
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <div className="cms-blog-preview">
      <div className="cms-blog-preview-badge">Live Preview</div>

      <div className="cms-blog-preview-frame">
        <div className="cms-blog-preview-content">
          <p className="cms-preview-category">
            <span aria-hidden="true" />
            {categories[0] || 'ZYLOOP AI'}
          </p>

          <h2 className="cms-preview-title">{form.title || 'Blog title preview'}</h2>

          <p className="cms-preview-meta">
            <span>{form.date ? formatBlogDate(form.date) : 'Publish date'}</span>
            {' '}| BY <span>{form.author || 'Author name'}</span>
            {categories.length > 0 && (
              <>
                {' '}|{' '}
                {categories.join(', ')}
              </>
            )}
          </p>

          {form.image ? (
            <BlogFeaturedImage
              src={form.image}
              alt={form.title || 'Blog preview'}
              className="single_img"
              variant="preview"
            />
          ) : (
            <BlogImageFrame variant="preview" className="is-placeholder">
              Featured image preview
            </BlogImageFrame>
          )}

          <div className="cms-preview-short-desc">
            <span className="cms-preview-label">Short Description</span>
            <p>{form.excerpt || 'Add a short description to preview it here…'}</p>
          </div>

          <div className="cms-preview-full-content">
            <span className="cms-preview-label">Full Content</span>
            <BlogContentBody content={form.content} className="cms-preview-paragraph" />
          </div>

          {tags.length > 0 && (
            <div className="cms-preview-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
