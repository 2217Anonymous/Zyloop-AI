import { ApiError, apiRequest } from './client'

const SETTINGS_ID = 1

export const DEFAULT_SETTINGS = {
  id: SETTINGS_ID,
  testimonialsEnabled: false,
  logoUrl: '/images/logo.png',
  heroVideoUrl: '/images/zyloop-ai.webm',
  heroVideoType: 'video/webm',
  heroPosterUrl: '/images/slide1.jpg',
  heroBadge: 'Zyloop Automate',
  heroHeading: 'Automate What',
  heroAccent: 'Matters',
  heroText:
    'Build intelligent AI workflows and let Zyloop automate WhatsApp, CRM, healthcare, finance, and everyday business operations.',
  heroPrimaryCta: 'Explore Automate',
  heroSolutionId: 'zyloopflow',
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

export function uploadImage(file, replaceUrl) {
  const formData = new FormData()
  formData.append('image', file)
  if (replaceUrl) formData.append('replaceUrl', replaceUrl)
  return apiRequest('/upload', {
    method: 'POST',
    body: formData,
    auth: true,
  })
}

export function uploadVideo(file, replaceUrl) {
  const formData = new FormData()
  formData.append('video', file)
  if (replaceUrl) formData.append('replaceUrl', replaceUrl)
  return apiRequest('/upload-video', {
    method: 'POST',
    body: formData,
    auth: true,
  }).catch((err) => {
    if (err instanceof ApiError && err.status === 404) {
      throw new ApiError(
        'Video upload route is missing. Stop the terminal and run npm run dev again.',
        404,
      )
    }
    throw err
  })
}
