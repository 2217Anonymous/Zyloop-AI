import { DEFAULT_SETTINGS } from '../../api/settings'
import { useSiteSettings } from '../../context/SiteSettingsContext'

export function BrandLogo({ className = '', width = 220 }) {
  const { settings } = useSiteSettings()
  const src = settings?.logoUrl || DEFAULT_SETTINGS.logoUrl

  return (
    <img
      src={src}
      alt="ZYLOOP AI"
      className={className}
      style={{ width: 'auto', height: 'auto', display: 'block', maxWidth: width }}
    />
  )
}
