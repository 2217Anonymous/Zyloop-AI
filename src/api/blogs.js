import { apiRequest } from './client'

export function getBlogs() {
  return apiRequest('/blogs')
}

export function getBlog(id) {
  return apiRequest(`/blogs/${id}`)
}

export function getBlogBySlug(slug) {
  return apiRequest(`/blogs?slug=${encodeURIComponent(slug)}`).then((items) => items[0] || null)
}

export function createBlog(data) {
  return apiRequest('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function updateBlog(id, data) {
  return apiRequest(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    auth: true,
  })
}

export function deleteBlog(id) {
  return apiRequest(`/blogs/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}
