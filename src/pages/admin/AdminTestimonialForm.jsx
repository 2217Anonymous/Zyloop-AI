import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createTestimonial, getTestimonials, updateTestimonial } from '../../api/testimonials'
import FormField from '../../components/admin/FormField'
import ImageUpload from '../../components/admin/ImageUpload'
import { useToast } from '../../context/ToastContext'

const emptyForm = {
  name: '',
  role: '',
  image: '',
  text: '',
}

export default function AdminTestimonialForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return

    getTestimonials()
      .then((items) => {
        const item = items.find((entry) => String(entry.id) === String(id))
        if (!item) throw new Error('Testimonial not found')
        setForm({
          name: item.name || '',
          role: item.role || '',
          image: item.image || '',
          text: item.text || '',
        })
      })
      .catch((err) => setError(err.message || 'Failed to load testimonial'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      image: form.image.trim(),
      text: form.text.trim(),
    }

    try {
      if (isEdit) {
        await updateTestimonial(id, { ...payload, id: Number(id) })
        toast.success('Testimonial updated successfully')
      } else {
        const existing = await getTestimonials()
        await createTestimonial({ ...payload, order: existing.length + 1 })
        toast.success('Testimonial created successfully')
      }
      navigate('/admin/testimonials')
    } catch (err) {
      toast.error(err.message || 'Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="cms-state">Loading testimonial…</div>
  if (error) return <div className="cms-state cms-state-error">{error}</div>

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>{isEdit ? 'Edit Testimonial' : 'New Testimonial'}</h1>
          <p>Add customer name, role, image, and testimonial content.</p>
        </div>
        <Link to="/admin/testimonials" className="cms-btn cms-btn-ghost">Back to list</Link>
      </div>

      <form className="cms-form-card" onSubmit={handleSubmit}>
        <FormField label="Customer Name" id="name" required>
          <input
            id="name"
            className="cms-input"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Role / Company" id="role" required>
          <input
            id="role"
            className="cms-input"
            value={form.role}
            onChange={(e) => updateField('role', e.target.value)}
            required
          />
        </FormField>

        <ImageUpload
          label="Customer Image"
          id="image"
          value={form.image}
          onChange={(value) => updateField('image', value)}
        />

        <FormField label="Testimonial Content" id="text" required>
          <textarea
            id="text"
            className="cms-textarea cms-textarea-lg"
            rows={8}
            value={form.text}
            onChange={(e) => updateField('text', e.target.value)}
            required
          />
        </FormField>

        <div className="cms-form-actions">
          <Link to="/admin/testimonials" className="cms-btn cms-btn-ghost">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Testimonial' : 'Create Testimonial'}
          </button>
        </div>
      </form>
    </div>
  )
}
