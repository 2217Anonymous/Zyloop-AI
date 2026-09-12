export function renderBlogContent(content = '') {
  if (!content.trim()) return []

  if (/<[a-z][\s\S]*>/i.test(content)) {
    return [{ type: 'html', value: content }]
  }

  return content
    .split('\n')
    .filter(Boolean)
    .map((paragraph) => ({ type: 'paragraph', value: paragraph }))
}

export function BlogContentBody({ content, className = 'd-text' }) {
  const blocks = renderBlogContent(content)

  if (!blocks.length) {
    return <p className={className}>Start writing full content to see it here…</p>
  }

  return blocks.map((block, index) => {
    if (block.type === 'html') {
      return (
        <div
          key={`html-${index}`}
          className={`${className} cms-blog-html-content`}
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      )
    }

    return (
      <p className={className} key={`p-${index}`}>
        {block.value}
      </p>
    )
  })
}
