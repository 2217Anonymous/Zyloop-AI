import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { getStoredToken } from '../../utils/authStorage'
import { BrandLogo } from '../../components/layout/ZLogo'
import Seo from '../../components/Seo'
import { seoPages } from '../../data/seo'

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from || '/admin'

  if (isAuthenticated || getStoredToken()) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username.trim(), password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cms-login-page">
      <Seo {...seoPages.admin} title="Admin Login | ZYLOOP AI" />
      <div className="cms-login-bg" aria-hidden="true">
        <span className="cms-login-orb cms-login-orb-cyan" />
        <span className="cms-login-orb cms-login-orb-blue" />
        <span className="cms-login-orb cms-login-orb-violet" />
        <span className="cms-login-ring cms-login-ring-one" />
        <span className="cms-login-ring cms-login-ring-two" />
        <span className="cms-login-wave" />
      </div>
      <div className="cms-login-card">
        <div className="cms-login-brand">
          <BrandLogo width={168} />
          <span className="cms-login-badge">Content Management System</span>
        </div>

        <div className="cms-login-heading">
          <h1>Admin Login</h1>
          <p className="cms-login-sub">Sign in to manage blogs, testimonials, and FAQs.</p>
        </div>

        <form onSubmit={handleSubmit} className="cms-login-form">
          <div className="cms-login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="cms-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="cms-login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="cms-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="cms-login-error" role="alert">{error}</p>}

          <button type="submit" className="cms-btn cms-btn-primary cms-btn-block cms-login-submit" disabled={loading}>
            {loading ? 'Signing in…' : (
              <>
                <FaLock aria-hidden="true" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
