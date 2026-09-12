import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBlog, FaComments, FaPlus, FaQuestionCircle } from 'react-icons/fa'
import { getBlogs } from '../../api/blogs'
import { getFaqs } from '../../api/faqs'
import { getTestimonials } from '../../api/testimonials'

function StatCard({ label, count, to, icon: Icon }) {
  return (
    <Link to={to} className="cms-stat-card">
      <div className="cms-stat-icon">
        <Icon aria-hidden="true" />
      </div>
      <div>
        <p className="cms-stat-label">{label}</p>
        <p className="cms-stat-count">{count}</p>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, testimonials: 0, faqs: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getBlogs(), getTestimonials(), getFaqs()])
      .then(([blogs, testimonials, faqs]) => {
        setStats({
          blogs: blogs.length,
          testimonials: testimonials.length,
          faqs: faqs.length,
        })
      })
      .catch((err) => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your website content from one place.</p>
        </div>
      </div>

      {loading && <div className="cms-state">Loading dashboard…</div>}
      {error && <div className="cms-state cms-state-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="cms-stat-grid">
            <StatCard label="Blog Posts" count={stats.blogs} to="/admin/blogs" icon={FaBlog} />
            <StatCard label="Testimonials" count={stats.testimonials} to="/admin/testimonials" icon={FaComments} />
            <StatCard label="FAQs" count={stats.faqs} to="/admin/faqs" icon={FaQuestionCircle} />
          </div>

          <div className="cms-quick-actions">
            <h2>Quick Actions</h2>
            <div className="cms-action-row">
              <Link to="/admin/blogs/new" className="cms-btn cms-btn-primary">
                <FaPlus aria-hidden="true" /> New Blog
              </Link>
              <Link to="/admin/testimonials/new" className="cms-btn cms-btn-secondary">
                <FaPlus aria-hidden="true" /> New Testimonial
              </Link>
              <Link to="/admin/faqs/new" className="cms-btn cms-btn-secondary">
                <FaPlus aria-hidden="true" /> New FAQ
              </Link>
              <Link to="/admin/settings" className="cms-btn cms-btn-secondary">
                <FaPlus aria-hidden="true" /> Site Settings
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
