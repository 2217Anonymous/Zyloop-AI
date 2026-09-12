import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginRequest } from '../api/auth'
import {
  clearStoredAuth,
  clearLegacyAuthStorage,
  readStoredAuth,
  saveStoredAuth,
} from '../utils/authStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredAuth().token)
  const [user, setUser] = useState(() => readStoredAuth().user)

  useEffect(() => {
    clearLegacyAuthStorage()
  }, [])

  const syncFromStorage = useCallback(() => {
    const { token: storedToken, user: storedUser } = readStoredAuth()
    setToken(storedToken)
    setUser(storedUser)
  }, [])

  const login = useCallback(async (username, password) => {
    const result = await loginRequest(username, password)
    saveStoredAuth(result.token, result.user)
    setToken(result.token)
    setUser(result.user)
    return result.user
  }, [])

  const logout = useCallback(() => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      syncFromStorage,
    }),
    [token, user, login, logout, syncFromStorage],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
