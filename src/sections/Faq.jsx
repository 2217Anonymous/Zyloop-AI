import { useEffect, useMemo, useState } from 'react'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { getFaqs } from '../api/faqs'
import { faqSection } from '../data/content'
import { Container } from '../components/Grid'
import ContentState from '../components/ContentState'
import ScrollWatermark from '../components/ui/ScrollWatermark'

export default function Faq() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openId, setOpenId] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getFaqs()
      .then((data) => {
        const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0))
        setFaqs(sorted)
      })
      .catch((err) => setError(err.message || 'Unable to load FAQs'))
      .finally(() => setLoading(false))
  }, [])

  const filteredFaqs = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return faqs
    return faqs.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(term))
  }, [faqs, query])

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section className="faq-sec relative" id="faq">
      <ScrollWatermark text="FAQ'S" className="faq-scroll-watermark" range={450} />
      <Container className="relative">
        <div className="faq-panel wow fadeInUp">
          <div className="faq-header">
            <span className="faq-kicker">{faqSection.kicker}</span>
            <h2 className="faq-title">
              {faqSection.titleBefore} <span>{faqSection.titleAccent}</span>
            </h2>
            <p className="faq-desc">{faqSection.desc}</p>
          </div>

          <label className="faq-search" htmlFor="faq-search">
            <FaSearch className="faq-search-icon" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpenId(null)
              }}
              placeholder="Search questions"
              autoComplete="off"
              disabled={loading || Boolean(error)}
            />
          </label>

          <ContentState
            loading={loading ? 'Loading FAQs…' : false}
            error={!loading && error ? error : false}
            empty={!loading && !error && faqs.length === 0}
            emptyMessage="No FAQs published yet."
          />

          {!loading && !error && faqs.length > 0 && (
            <div className="faq-list">
              {filteredFaqs.length === 0 && (
                <p className="faq-empty">No matching questions.</p>
              )}

              {filteredFaqs.map((item, index) => {
                const isOpen = openId === item.id
                const number = String(index + 1).padStart(2, '0')

                return (
                  <div key={item.id} className="faq-item">
                    <button
                      type="button"
                      className={`faq-trigger${isOpen ? ' is-open' : ''}`}
                      aria-expanded={isOpen}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="faq-number">{number}</span>
                      <span className="faq-question">{item.question}</span>
                      <FaChevronDown className="faq-chevron" aria-hidden="true" />
                    </button>

                    <div className={`faq-answer-wrap${isOpen ? ' is-open' : ''}`}>
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
