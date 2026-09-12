import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function VideoModal({ open, onClose, src = '/images/blogs/video.mp4', poster = '/images/blogs/1.jpg' }) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.classList.add('video-modal-open')
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('video-modal-open')
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Watch demo video"
    >
      <div className="video-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="video-modal-close" aria-label="Close video">
          ×
        </button>
        <video className="video-modal-player" controls autoPlay playsInline poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>,
    document.body,
  )
}
