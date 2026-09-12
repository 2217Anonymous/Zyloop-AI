import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { deleteBlog, getBlogs } from '../../api/blogs'
import { formatBlogDateShort } from '../../api/client'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../context/ToastContext'

export default function AdminBlogs() {
  const toast = useToast()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadBlogs = () => {
    setLoading(true)
    getBlogs()
      .then((data) => setBlogs(data.sort((a, b) => new Date(b.date) - new Date(a.date))))
      .catch((err) => setError(err.message || 'Failed to load blogs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteBlog(deleteTarget.id)
      toast.success('Blog deleted successfully')
      setDeleteTarget(null)
      loadBlogs()
    } catch (err) {
      toast.error(err.message || 'Failed to delete blog')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>Blogs</h1>
          <p>Create, edit, and publish blog posts.</p>
        </div>
        <Link to="/admin/blogs/new" className="cms-btn cms-btn-primary">
          <FaPlus aria-hidden="true" /> New Blog
        </Link>
      </div>

      {loading && <div className="cms-state">Loading blogs…</div>}
      {error && <div className="cms-state cms-state-error">{error}</div>}

      {!loading && !error && blogs.length === 0 && (
        <div className="cms-state">No blogs yet. Create your first post.</div>
      )}

      {!loading && !error && blogs.length > 0 && (
        <div className="cms-table-wrap">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <img src={blog.image} alt="" className="cms-table-thumb" />
                  </td>
                  <td>
                    <strong>{blog.title}</strong>
                    <span className="cms-table-meta">{blog.slug}</span>
                  </td>
                  <td>{blog.author}</td>
                  <td>{formatBlogDateShort(blog.date)}</td>
                  <td>{(blog.categories || []).join(', ')}</td>
                  <td>
                    <div className="cms-table-actions">
                      <Link to={`/admin/blogs/${blog.id}/edit`} className="cms-icon-btn" aria-label="Edit">
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        className="cms-icon-btn cms-icon-btn-danger"
                        aria-label="Delete"
                        onClick={() => setDeleteTarget(blog)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
