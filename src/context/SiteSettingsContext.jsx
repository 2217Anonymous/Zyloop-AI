import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SETTINGS, getSettings, updateSettings as saveSettings } from '../api/settings'

const SiteSettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  loading: true,
  refresh: () => {},
  update: async () => DEFAULT_SETTINGS,
})

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  const refresh = () => {
    return getSettings()
      .then((data) => setSettings({ ...DEFAULT_SETTINGS, ...data }))
      .catch(() => setSettings(DEFAULT_SETTINGS))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  const update = async (data) => {
    const saved = await saveSettings(data)
    const next = { ...DEFAULT_SETTINGS, ...saved }
    setSettings(next)
    return next
  }

  const value = useMemo(() => ({ settings, loading, refresh, update }), [settings, loading])

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
