import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getStoredToken } from '../../utils/authStorage'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const location = useLocation()
  const isAuthed = Boolean(token || getStoredToken())

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}
