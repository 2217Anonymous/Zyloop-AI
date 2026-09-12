import { useRef, useState } from 'react'
import { uploadImage } from '../../api/auth'
import BlogFeaturedImage from '../BlogFeaturedImage'
import { useToast } from '../../context/ToastContext'
import FormField from './FormField'

export default function ImageUpload({ label, id, value, onChange, hint }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const result = await uploadImage(file)
      onChange(result.url)
      toast.success('Image uploaded successfully')
    } catch (err) {
      toast.error(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <FormField label={label} id={id} hint={hint}>
      <div className="cms-image-upload">
        {value && (
          <BlogFeaturedImage
            src={value}
            alt="Upload preview"
            variant="upload"
          />
        )}
        <input
          id={id}
          type="text"
          className="cms-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.jpg or /uploads/..."
        />
        <div className="cms-image-actions">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="cms-file-input"
            onChange={handleFile}
          />
          <button
            type="button"
            className="cms-btn cms-btn-secondary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : 'Upload Image'}
          </button>
        </div>
      </div>
    </FormField>
  )
}
