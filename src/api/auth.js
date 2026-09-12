import { apiRequest } from './client'

export function login(username, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  return apiRequest('/upload', {
    method: 'POST',
    body: formData,
    auth: true,
  })
}
