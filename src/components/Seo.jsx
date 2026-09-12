import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../data/seo'

function upsertMeta(selector, attributes) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) el.setAttribute(key, value)
  })
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(data) {
  const id = 'zyloop-seo-jsonld'
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  jsonLd,
  publishedTime,
  author,
}) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)
    const fullTitle = title || SITE_NAME

    document.title = fullTitle

    upsertMeta('meta[name="description"]', { name: 'description', content: description || '' })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords || '' })
    upsertMeta('meta[name="author"]', { name: 'author', content: author || SITE_NAME })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    })
    upsertMeta('meta[name="googlebot"]', {
      name: 'googlebot',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    })

    upsertLink('canonical', url)

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description || '' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description || '' })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })

    if (publishedTime) {
      upsertMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: publishedTime,
      })
    }

    const payload = Array.isArray(jsonLd)
      ? { '@context': 'https://schema.org', '@graph': jsonLd.map(({ '@context': _c, ...item }) => item) }
      : jsonLd
    setJsonLd(payload)
  }, [title, description, keywords, path, image, type, noIndex, jsonLd, publishedTime, author])

  return null
}
