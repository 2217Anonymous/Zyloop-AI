import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createBlog, getBlog, updateBlog } from '../../api/blogs'
import { slugify } from '../../api/client'
import BlogLivePreview from '../../components/admin/BlogLivePreview'
import ContentEditor from '../../components/admin/ContentEditor'
import FormField from '../../components/admin/FormField'
import ImageUpload from '../../components/admin/ImageUpload'
import { useToast } from '../../context/ToastContext'

const emptyForm = {
  title: '',
  slug: '',
  image: '',
  date: new Date().toISOString().slice(0, 10),
  author: '',
  categories: '',
  tags: '',
  excerpt: '',
  content: '',
}

export default function AdminBlogForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)

  useEffect(() => {
    if (!isEdit) return

    getBlog(id)
      .then((blog) => {
        setForm({
          title: blog.title || '',
          slug: blog.slug || '',
          image: blog.image || '',
          date: blog.date || '',
          author: blog.author || '',
          categories: (blog.categories || []).join(', '),
          tags: (blog.tags || []).join(', '),
          excerpt: blog.excerpt || '',
          content: blog.content || '',
        })
      })
      .catch((err) => setError(err.message || 'Failed to load blog'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'title' && !slugEdited) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      image: form.image.trim(),
      date: form.date,
      author: form.author.trim(),
      categories: form.categories.split(',').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
    }

    try {
      if (isEdit) {
        await updateBlog(id, { ...payload, id: Number(id) })
        toast.success('Blog updated successfully')
      } else {
        await createBlog(payload)
        toast.success('Blog created successfully')
      }
      navigate('/admin/blogs')
    } catch (err) {
      toast.error(err.message || 'Failed to save blog')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="cms-state">Loading blog…</div>
  if (error) return <div className="cms-state cms-state-error">{error}</div>

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>{isEdit ? 'Edit Blog' : 'New Blog'}</h1>
          <p>Fill in the details below to publish on the public blog.</p>
        </div>
        <Link to="/admin/blogs" className="cms-btn cms-btn-ghost">Back to list</Link>
      </div>

      <div className="cms-blog-editor-layout">
      <form className="cms-form-card cms-blog-form-panel" onSubmit={handleSubmit}>
        <FormField label="Title" id="title" required>
          <input
            id="title"
            className="cms-input"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Slug" id="slug" hint="URL-friendly identifier for the blog post">
          <input
            id="slug"
            className="cms-input"
            value={form.slug}
            onChange={(e) => {
              setSlugEdited(true)
              updateField('slug', e.target.value)
            }}
            required
          />
        </FormField>

        <ImageUpload
          label="Featured Image"
          id="image"
          value={form.image}
          onChange={(value) => updateField('image', value)}
          hint="Upload an image or paste an existing path like /images/blogs/b1.jpg"
        />

        <div className="cms-form-grid">
          <FormField label="Author" id="author" required>
            <input
              id="author"
              className="cms-input"
              value={form.author}
              onChange={(e) => updateField('author', e.target.value)}
              required
            />
          </FormField>

          <FormField label="Publish Date" id="date" required>
            <input
              id="date"
              type="date"
              className="cms-input"
              value={form.date}
              onChange={(e) => updateField('date', e.target.value)}
              required
            />
          </FormField>
        </div>

        <div className="cms-form-grid">
          <FormField label="Categories" id="categories" hint="Comma-separated">
            <input
              id="categories"
              className="cms-input"
              value={form.categories}
              onChange={(e) => updateField('categories', e.target.value)}
            />
          </FormField>

          <FormField label="Tags" id="tags" hint="Comma-separated">
            <input
              id="tags"
              className="cms-input"
              value={form.tags}
              onChange={(e) => updateField('tags', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Short Description" id="excerpt" required>
          <textarea
            id="excerpt"
            className="cms-textarea"
            rows={3}
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            required
          />
        </FormField>

        <ContentEditor
          id="content"
          label="Full Content"
          value={form.content}
          onChange={(value) => updateField('content', value)}
          required
          hint="Use the toolbar for formatting. Changes appear instantly in the preview."
        />

        <div className="cms-form-actions">
          <Link to="/admin/blogs" className="cms-btn cms-btn-ghost">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>
      </form>

      <aside className="cms-blog-preview-panel" aria-label="Blog live preview">
        <BlogLivePreview form={form} />
      </aside>
      </div>
    </div>
  )
}
