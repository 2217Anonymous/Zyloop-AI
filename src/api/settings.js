import { ApiError, apiRequest } from './client'

const SETTINGS_ID = 1

const DEFAULT_SETTINGS = {
  id: SETTINGS_ID,
  testimonialsEnabled: false,
}

export function getSettings() {
  return apiRequest('/settings/1').catch((err) => {
    if (err instanceof ApiError && err.status === 404) {
      return DEFAULT_SETTINGS
    }
    throw err
  })
}

export function updateSettings(data) {
  return apiRequest(`/settings/${SETTINGS_ID}`, {
    method: 'PUT',
    body: JSON.stringify({ ...DEFAULT_SETTINGS, ...data, id: SETTINGS_ID }),
    auth: true,
  }).catch(async (err) => {
    if (err instanceof ApiError && err.status === 404) {
      return apiRequest('/settings', {
        method: 'POST',
        body: JSON.stringify({ ...DEFAULT_SETTINGS, ...data, id: SETTINGS_ID }),
        auth: true,
      })
    }
    throw err
  })
}
