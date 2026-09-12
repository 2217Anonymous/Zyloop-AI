export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading = false }) {
  if (!open) return null

  return (
    <div className="cms-modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="cms-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="cms-modal-actions">
          <button type="button" className="cms-btn cms-btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="cms-btn cms-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
