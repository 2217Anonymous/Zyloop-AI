import { useRef } from 'react'
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaLink,
  FaListUl,
} from 'react-icons/fa'

function wrapSelection(textarea, before, after = before) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.slice(start, end)
  const nextValue = `${textarea.value.slice(0, start)}${before}${selected}${after}${textarea.value.slice(end)}`
  const cursor = start + before.length + selected.length + after.length
  return { nextValue, cursor }
}

function insertAtCursor(textarea, snippet) {
  const start = textarea.selectionStart
  const nextValue = `${textarea.value.slice(0, start)}${snippet}${textarea.value.slice(start)}`
  const cursor = start + snippet.length
  return { nextValue, cursor }
}

export default function ContentEditor({ id, label, value, onChange, required = false, rows = 12, hint }) {
  const textareaRef = useRef(null)

  const applyWrap = (before, after) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const { nextValue, cursor } = wrapSelection(textarea, before, after)
    onChange(nextValue)
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  const applyInsert = (snippet) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const { nextValue, cursor } = insertAtCursor(textarea, snippet)
    onChange(nextValue)
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  return (
    <div className="cms-content-editor">
      <div className="cms-content-editor-head">
        <label htmlFor={id}>
          {label}
          {required && <span className="cms-required">*</span>}
        </label>
        {hint && <p className="cms-field-hint">{hint}</p>}
      </div>

      <div className="cms-editor-toolbar" role="toolbar" aria-label="Formatting toolbar">
        <button type="button" className="cms-editor-btn" title="Bold" onClick={() => applyWrap('<strong>', '</strong>')}>
          <FaBold aria-hidden="true" />
        </button>
        <button type="button" className="cms-editor-btn" title="Italic" onClick={() => applyWrap('<em>', '</em>')}>
          <FaItalic aria-hidden="true" />
        </button>
        <button type="button" className="cms-editor-btn" title="Heading" onClick={() => applyWrap('<h3>', '</h3>')}>
          <FaHeading aria-hidden="true" />
        </button>
        <button
          type="button"
          className="cms-editor-btn"
          title="Bullet list"
          onClick={() => applyInsert('<ul>\n  <li>List item</li>\n</ul>\n')}
        >
          <FaListUl aria-hidden="true" />
        </button>
        <button
          type="button"
          className="cms-editor-btn"
          title="Link"
          onClick={() => applyWrap('<a href="https://">', '</a>')}
        >
          <FaLink aria-hidden="true" />
        </button>
        <button type="button" className="cms-editor-btn cms-editor-btn-text" onClick={() => applyInsert('\n\n')}>
          Paragraph
        </button>
      </div>

      <textarea
        ref={textareaRef}
        id={id}
        className="cms-textarea cms-textarea-lg cms-editor-textarea"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder="Write full blog content. Use toolbar for formatting or plain paragraphs separated by blank lines."
      />
    </div>
  )
}
