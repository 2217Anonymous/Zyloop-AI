import { apiRequest } from './client'

export function getFaqs() {
  return apiRequest('/faqs')
}

export function createFaq(data) {
  return apiRequest('/faqs', {
    method: 'POST',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function updateFaq(id, data) {
  return apiRequest(`/faqs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function deleteFaq(id) {
  return apiRequest(`/faqs/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}

export async function reorderFaqs(faqs) {
  const updates = faqs.map((faq, index) =>
    updateFaq(faq.id, { ...faq, order: index + 1 }),
  )
  return Promise.all(updates)
}
