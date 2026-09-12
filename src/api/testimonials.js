import { apiRequest } from './client'

export function getTestimonials() {
  return apiRequest('/testimonials')
}

export function createTestimonial(data) {
  return apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function updateTestimonial(id, data) {
  return apiRequest(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function deleteTestimonial(id) {
  return apiRequest(`/testimonials/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}
