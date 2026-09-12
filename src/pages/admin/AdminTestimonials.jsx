import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { getSettings, updateSettings } from '../../api/settings'
import { deleteTestimonial, getTestimonials } from '../../api/testimonials'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../context/ToastContext'

export default function AdminTestimonials() {
  const toast = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [sectionEnabled, setSectionEnabled] = useState(false)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [togglingSection, setTogglingSection] = useState(false)

  const loadItems = () => {
    setLoading(true)
    getTestimonials()
      .then((data) => setItems(data.sort((a, b) => (a.order || 0) - (b.order || 0))))
      .catch((err) => setError(err.message || 'Failed to load testimonials'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadItems()
    getSettings()
      .then((settings) => setSectionEnabled(Boolean(settings?.testimonialsEnabled)))
      .catch((err) => toast.error(err.message || 'Failed to load section settings'))
      .finally(() => setSettingsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSectionToggle = async () => {
    const nextValue = !sectionEnabled
    setTogglingSection(true)
    try {
      await updateSettings({ testimonialsEnabled: nextValue })
      setSectionEnabled(nextValue)
      toast.success(nextValue ? 'Testimonials section is now visible on the website' : 'Testimonials section hidden from the website')
    } catch (err) {
      toast.error(err.message || 'Failed to update section visibility')
    } finally {
      setTogglingSection(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteTestimonial(deleteTarget.id)
      toast.success('Testimonial deleted successfully')
      setDeleteTarget(null)
      loadItems()
    } catch (err) {
      toast.error(err.message || 'Failed to delete testimonial')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>Testimonials</h1>
          <p>Manage customer testimonials shown on the website.</p>
        </div>
        <Link to="/admin/testimonials/new" className="cms-btn cms-btn-primary">
          <FaPlus aria-hidden="true" /> New Testimonial
        </Link>
      </div>

      <div className="cms-section-toggle-card">
        <div>
          <h2>Website Section</h2>
          <p>
            {sectionEnabled
              ? 'The Satisfied Customers carousel is visible on the home page.'
              : 'The Satisfied Customers carousel is hidden on the home page.'}
          </p>
        </div>
        <label className="cms-toggle">
          <input
            type="checkbox"
            checked={sectionEnabled}
            onChange={handleSectionToggle}
            disabled={settingsLoading || togglingSection}
          />
          <span className="cms-toggle-track" aria-hidden="true" />
          <span className="cms-toggle-label">{sectionEnabled ? 'Active' : 'Inactive'}</span>
        </label>
      </div>

      {loading && <div className="cms-state">Loading testimonials…</div>}
      {error && <div className="cms-state cms-state-error">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="cms-state">No testimonials yet.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="cms-table-wrap">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role / Company</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt="" className="cms-table-thumb cms-table-thumb-round" />
                  </td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.role}</td>
                  <td className="cms-table-clamp">{item.text}</td>
                  <td>
                    <div className="cms-table-actions">
                      <Link to={`/admin/testimonials/${item.id}/edit`} className="cms-icon-btn" aria-label="Edit">
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        className="cms-icon-btn cms-icon-btn-danger"
                        aria-label="Delete"
                        onClick={() => setDeleteTarget(item)}
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
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
