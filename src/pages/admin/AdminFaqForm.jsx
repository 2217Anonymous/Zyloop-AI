import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createFaq, getFaqs, updateFaq } from '../../api/faqs'
import FormField from '../../components/admin/FormField'
import { useToast } from '../../context/ToastContext'

const emptyForm = {
  question: '',
  answer: '',
}

export default function AdminFaqForm() {
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

    getFaqs()
      .then((items) => {
        const item = items.find((entry) => String(entry.id) === String(id))
        if (!item) throw new Error('FAQ not found')
        setForm({
          question: item.question || '',
          answer: item.answer || '',
        })
      })
      .catch((err) => setError(err.message || 'Failed to load FAQ'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
    }

    try {
      if (isEdit) {
        const existing = await getFaqs()
        const current = existing.find((entry) => String(entry.id) === String(id))
        await updateFaq(id, { ...payload, id: Number(id), order: current?.order || 1 })
        toast.success('FAQ updated successfully')
      } else {
        const existing = await getFaqs()
        await createFaq({ ...payload, order: existing.length + 1 })
        toast.success('FAQ created successfully')
      }
      navigate('/admin/faqs')
    } catch (err) {
      toast.error(err.message || 'Failed to save FAQ')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="cms-state">Loading FAQ…</div>
  if (error) return <div className="cms-state cms-state-error">{error}</div>

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>{isEdit ? 'Edit FAQ' : 'New FAQ'}</h1>
          <p>Add a question and answer for the public FAQ section.</p>
        </div>
        <Link to="/admin/faqs" className="cms-btn cms-btn-ghost">Back to list</Link>
      </div>

      <form className="cms-form-card" onSubmit={handleSubmit}>
        <FormField label="Question" id="question" required>
          <input
            id="question"
            className="cms-input"
            value={form.question}
            onChange={(e) => updateField('question', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Answer" id="answer" required>
          <textarea
            id="answer"
            className="cms-textarea cms-textarea-lg"
            rows={8}
            value={form.answer}
            onChange={(e) => updateField('answer', e.target.value)}
            required
          />
        </FormField>

        <div className="cms-form-actions">
          <Link to="/admin/faqs" className="cms-btn cms-btn-ghost">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update FAQ' : 'Create FAQ'}
          </button>
        </div>
      </form>
    </div>
  )
}
