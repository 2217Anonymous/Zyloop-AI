export const SITE_NAME = 'ZYLOOP AI'
export const SITE_DEFAULT_URL = 'https://zyloopai.com'
export const DEFAULT_OG_IMAGE = '/images/slide1.jpg'

export const CORE_KEYWORDS = [
  'ZYLOOP AI',
  'AI automation',
  'workflow automation',
  'WhatsApp automation',
  'WhatsApp Business API',
  'agentic AI',
  'no-code automation',
  'enterprise AI',
  'CRM automation',
  'hospital management software',
  'digital lending software',
  'voice AI agents',
  'AI chatbot India',
  'business process automation',
  'Coimbatore AI company',
]

export const seoPages = {
  home: {
    title: 'ZYLOOP AI | AI Workflow, WhatsApp & CRM Automation Software',
    description:
      'ZYLOOP AI builds no-code AI automation for WhatsApp, CRM, healthcare, finance, and enterprise workflows. Automate conversations, operations, and customer journeys from Coimbatore, India.',
    keywords: CORE_KEYWORDS.join(', '),
    path: '/',
  },
  blog: {
    title: 'AI Automation Blog | WhatsApp, CRM & Workflow Insights | ZYLOOP AI',
    description:
      'Read ZYLOOP AI guides on agentic AI, WhatsApp Business automation, voice AI, CRM workflows, healthcare operations, and no-code enterprise automation.',
    keywords: [
      'AI automation blog',
      'WhatsApp automation guide',
      'agentic AI insights',
      'CRM automation articles',
      'workflow automation India',
      ...CORE_KEYWORDS,
    ].join(', '),
    path: '/blog',
  },
  admin: {
    title: 'Admin | ZYLOOP AI',
    description: 'ZYLOOP AI content administration.',
    keywords: SITE_NAME,
    path: '/admin',
    noIndex: true,
  },
}

export function getSiteUrl() {
  if (import.meta.env.VITE_SITE_URL) {
    return String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin
  }
  return SITE_DEFAULT_URL
}

export function absoluteUrl(path = '/') {
  const site = getSiteUrl()
  if (!path || path === '/') return site
  return `${site}${path.startsWith('/') ? path : `/${path}`}`
}

export function blogSeo(post) {
  const title = post?.title
    ? `${post.title} | ZYLOOP AI Blog`
    : seoPages.blog.title
  const description =
    post?.excerpt ||
    `Read ${post?.title || 'this ZYLOOP AI article'} on AI automation, WhatsApp workflows, and enterprise operations.`
  const tags = [...(post?.categories || []), ...(post?.tags || [])]
  const keywords = [...tags, ...CORE_KEYWORDS].join(', ')

  return {
    title,
    description,
    keywords,
    path: post?.slug ? `/blog/${post.slug}` : '/blog',
    image: post?.image || DEFAULT_OG_IMAGE,
    type: 'article',
    publishedTime: post?.date,
    author: post?.author || SITE_NAME,
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'SoftwareApplication'],
    name: SITE_NAME,
    url: getSiteUrl(),
    email: 'zyloopai@gmail.com',
    telephone: '+91-97899-88166',
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl('/images/logo.png'),
    description: seoPages.home.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    areaServed: ['India', 'Coimbatore'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kalapatti Main Rd, NGP Nagar, Nehru Nagar West',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641048',
      addressCountry: 'IN',
    },
    sameAs: ['https://instagram.com/zylearnai'],
    keywords: CORE_KEYWORDS.join(', '),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getSiteUrl(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${getSiteUrl()}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleJsonLd(post) {
  if (!post) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image || DEFAULT_OG_IMAGE),
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/logo.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: [...(post.categories || []), ...(post.tags || []), ...CORE_KEYWORDS].join(', '),
  }
}
