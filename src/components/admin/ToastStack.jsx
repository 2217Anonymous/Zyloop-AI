import { useToast } from '../../context/ToastContext'

export default function ToastStack() {
  const { toasts, dismiss } = useToast()

  if (!toasts.length) return null

  return (
    <div className="cms-toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`cms-toast cms-toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
