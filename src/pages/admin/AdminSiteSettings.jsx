import { useEffect, useRef, useState } from 'react'
import { aboutSolutions } from '../../data/content'
import { DEFAULT_SETTINGS, uploadImage } from '../../api/settings'
import { useSiteSettings } from '../../context/SiteSettingsContext'
import { useToast } from '../../context/ToastContext'
import FormField from '../../components/admin/FormField'
import ImageUpload from '../../components/admin/ImageUpload'
import VideoUpload from '../../components/admin/VideoUpload'

export default function AdminSiteSettings() {
  const { settings, update } = useSiteSettings()
  const toast = useToast()
  const logoInputRef = useRef(null)
  const [form, setForm] = useState(DEFAULT_SETTINGS)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  useEffect(() => {
    setForm({ ...DEFAULT_SETTINGS, ...settings })
  }, [settings])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleLogoFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadingLogo(true)
    try {
      const result = await uploadImage(file, form.logoUrl)
      const next = { ...form, logoUrl: result.url }
      setForm(next)
      await update(next)
      toast.success('Logo updated on the website.')
    } catch (err) {
      toast.error(err.message || 'Logo upload failed')
    } finally {
      setUploadingLogo(false)
      event.target.value = ''
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await update(form)
      toast.success('Site settings saved. The website now uses the new logo, video, and hero content.')
    } catch (err) {
      toast.error(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>Site Settings</h1>
          <p>Upload the logo, replace the hero video, and edit hero section content.</p>
        </div>
      </div>

      <form className="cms-form-card cms-site-settings" onSubmit={onSubmit}>
        <h2>Brand logo</h2>
        <FormField
          id="logoUrl"
          label="Website logo"
          hint="PNG recommended. The previous uploaded logo is removed. Save to publish on the website."
        >
          <div className="cms-image-upload">
            {form.logoUrl && <img src={form.logoUrl} alt="Logo preview" className="cms-logo-preview" />}
            <input
              id="logoUrl"
              type="text"
              className="cms-input"
              value={form.logoUrl}
              onChange={(e) => updateField('logoUrl', e.target.value)}
            />
            <div className="cms-image-actions">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="cms-file-input"
                onChange={handleLogoFile}
              />
              <button
                type="button"
                className="cms-btn cms-btn-secondary"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploadingLogo}
              >
                {uploadingLogo ? 'Uploading…' : 'Upload logo'}
              </button>
            </div>
          </div>
        </FormField>

        <h2>Hero video</h2>
        <VideoUpload
          id="heroVideoUrl"
          label="Hero background video"
          value={form.heroVideoUrl}
          replaceUrl={form.heroVideoUrl}
          onChange={async (url, type) => {
            const next = {
              ...form,
              heroVideoUrl: url,
              heroVideoType: type || form.heroVideoType,
            }
            setForm(next)
            await update(next)
          }}
        />
        <ImageUpload
          id="heroPosterUrl"
          label="Hero poster image"
          value={form.heroPosterUrl}
          onChange={(url) => updateField('heroPosterUrl', url)}
          hint="Shown before the video starts."
        />

        <h2>Hero content</h2>
        <div className="cms-form-grid">
          <FormField id="heroBadge" label="Badge">
            <input
              id="heroBadge"
              className="cms-input"
              value={form.heroBadge}
              onChange={(e) => updateField('heroBadge', e.target.value)}
            />
          </FormField>
          <FormField id="heroPrimaryCta" label="Primary button">
            <input
              id="heroPrimaryCta"
              className="cms-input"
              value={form.heroPrimaryCta}
              onChange={(e) => updateField('heroPrimaryCta', e.target.value)}
            />
          </FormField>
          <FormField id="heroHeading" label="Heading">
            <input
              id="heroHeading"
              className="cms-input"
              value={form.heroHeading}
              onChange={(e) => updateField('heroHeading', e.target.value)}
            />
          </FormField>
          <FormField id="heroAccent" label="Accent word">
            <input
              id="heroAccent"
              className="cms-input"
              value={form.heroAccent}
              onChange={(e) => updateField('heroAccent', e.target.value)}
            />
          </FormField>
        </div>
        <FormField id="heroText" label="Description">
          <textarea
            id="heroText"
            className="cms-input"
            rows="4"
            value={form.heroText}
            onChange={(e) => updateField('heroText', e.target.value)}
          />
        </FormField>
        <FormField id="heroSolutionId" label="Primary button section">
          <select
            id="heroSolutionId"
            className="cms-input"
            value={form.heroSolutionId}
            onChange={(e) => updateField('heroSolutionId', e.target.value)}
          >
            {aboutSolutions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </FormField>

        <div className="cms-form-actions">
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
