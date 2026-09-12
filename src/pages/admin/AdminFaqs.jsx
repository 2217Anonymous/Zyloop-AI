import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown, FaArrowUp, FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { deleteFaq, getFaqs, reorderFaqs } from '../../api/faqs'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../context/ToastContext'

export default function AdminFaqs() {
  const toast = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [reordering, setReordering] = useState(false)

  const loadItems = () => {
    setLoading(true)
    getFaqs()
      .then((data) => setItems(data.sort((a, b) => (a.order || 0) - (b.order || 0))))
      .catch((err) => setError(err.message || 'Failed to load FAQs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteFaq(deleteTarget.id)
      toast.success('FAQ deleted successfully')
      setDeleteTarget(null)
      loadItems()
    } catch (err) {
      toast.error(err.message || 'Failed to delete FAQ')
    } finally {
      setDeleting(false)
    }
  }

  const moveItem = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= items.length) return

    const next = [...items]
    const temp = next[index]
    next[index] = next[targetIndex]
    next[targetIndex] = temp

    setItems(next)
    setReordering(true)
    try {
      await reorderFaqs(next)
      toast.success('FAQ order updated')
      loadItems()
    } catch (err) {
      toast.error(err.message || 'Failed to reorder FAQs')
      loadItems()
    } finally {
      setReordering(false)
    }
  }

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>FAQs</h1>
          <p>Manage frequently asked questions on the website.</p>
        </div>
        <Link to="/admin/faqs/new" className="cms-btn cms-btn-primary">
          <FaPlus aria-hidden="true" /> New FAQ
        </Link>
      </div>

      {loading && <div className="cms-state">Loading FAQs…</div>}
      {error && <div className="cms-state cms-state-error">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="cms-state">No FAQs yet.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="cms-table-wrap">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <div className="cms-order-controls">
                      <button
                        type="button"
                        className="cms-icon-btn"
                        aria-label="Move up"
                        disabled={index === 0 || reordering}
                        onClick={() => moveItem(index, -1)}
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        type="button"
                        className="cms-icon-btn"
                        aria-label="Move down"
                        disabled={index === items.length - 1 || reordering}
                        onClick={() => moveItem(index, 1)}
                      >
                        <FaArrowDown />
                      </button>
                    </div>
                  </td>
                  <td><strong>{item.question}</strong></td>
                  <td className="cms-table-clamp">{item.answer}</td>
                  <td>
                    <div className="cms-table-actions">
                      <Link to={`/admin/faqs/${item.id}/edit`} className="cms-icon-btn" aria-label="Edit">
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
        title="Delete FAQ"
        message={`Are you sure you want to delete "${deleteTarget?.question}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
