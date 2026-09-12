import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { getStoredToken } from '../../utils/authStorage'
import ZyloopLogo from '../../components/ZyloopLogo'
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
      <div className="cms-login-card">
        <div className="cms-login-brand">
          <ZyloopLogo theme="dark" size="md" />
          <p>Content Management System</p>
        </div>

        <h1>Admin Login</h1>
        <p className="cms-login-sub">Sign in to manage blogs, testimonials, and FAQs.</p>

        <form onSubmit={handleSubmit} className="cms-login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="cms-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="cms-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="cms-login-error">{error}</p>}

          <button type="submit" className="cms-btn cms-btn-primary cms-btn-block" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
