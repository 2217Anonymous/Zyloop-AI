import { useRef, useState } from 'react'
import { uploadVideo } from '../../api/settings'
import { useToast } from '../../context/ToastContext'
import FormField from './FormField'

export default function VideoUpload({ label, id, value, onChange, replaceUrl, hint }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 200 * 1024 * 1024) {
      toast.error('Video is too large. Please use an MP4 or WEBM under 200 MB.')
      event.target.value = ''
      return
    }

    setUploading(true)
    try {
      const result = await uploadVideo(file, replaceUrl)
      onChange(result.url, result.type)
      toast.success('Hero video uploaded. The previous uploaded video was removed.')
    } catch (err) {
      toast.error(err.message || 'Video upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <FormField
      label={label}
      id={id}
      hint={hint || 'Upload one MP4 or WEBM. The previous uploaded hero video is deleted.'}
    >
      <div className="cms-image-upload">
        {value && (
          <video className="cms-video-preview" src={value} muted playsInline controls preload="metadata" />
        )}
        <input
          id={id}
          type="text"
          className="cms-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/zyloop-ai.webm or /uploads/..."
        />
        <div className="cms-image-actions">
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="cms-file-input"
            onChange={handleFile}
          />
          <button
            type="button"
            className="cms-btn cms-btn-secondary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : 'Upload Video'}
          </button>
        </div>
      </div>
    </FormField>
  )
}
