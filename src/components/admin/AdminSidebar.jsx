import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaBlog,
  FaComments,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { BrandLogo } from '../layout/ZLogo'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/blogs', label: 'Blogs', icon: FaBlog },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaComments },
  { to: '/admin/faqs', label: 'FAQs', icon: FaQuestionCircle },
  { to: '/admin/settings', label: 'Site Settings', icon: FaCog },
]

export default function AdminSidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="cms-sidebar-backdrop"
          aria-label="Close menu"
          onClick={onClose}
        />
      )}
      <aside className={`cms-sidebar${mobileOpen ? ' is-open' : ''}`}>
        <div className="cms-sidebar-brand">
          <a href="/" className="cms-brand-logo" aria-label="ZYLOOP AI Home">
            <BrandLogo width={168} />
          </a>
          <span>Admin</span>
        </div>

        <nav className="cms-sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `cms-nav-link${isActive ? ' is-active' : ''}`}
              onClick={onClose}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="cms-sidebar-footer">
          <p className="cms-sidebar-user">Signed in as <strong>{user?.username}</strong></p>
          <button type="button" className="cms-btn cms-btn-ghost cms-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
