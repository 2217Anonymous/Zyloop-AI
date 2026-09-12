const TOKEN_KEY = 'cms_auth_token'
const USER_KEY = 'cms_auth_user'

function getStorage() {
  if (typeof window === 'undefined') return null
  return window.sessionStorage
}

export function readStoredAuth() {
  const storage = getStorage()
  if (!storage) {
    return { token: null, user: null }
  }

  const storedToken = storage.getItem(TOKEN_KEY)
  const storedUser = storage.getItem(USER_KEY)

  return {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
  }
}

export function saveStoredAuth(token, user) {
  const storage = getStorage()
  if (!storage) return

  storage.setItem(TOKEN_KEY, token)
  storage.setItem(USER_KEY, JSON.stringify(user))
  clearLegacyAuth()
}

export function clearStoredAuth() {
  const storage = getStorage()
  storage?.removeItem(TOKEN_KEY)
  storage?.removeItem(USER_KEY)
  clearLegacyAuth()
}

export function getStoredToken() {
  return readStoredAuth().token
}

/** Remove old persistent tokens so admin cannot stay logged in after tab close */
function clearLegacyAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
}

export function clearLegacyAuthStorage() {
  clearLegacyAuth()
}

export { TOKEN_KEY, USER_KEY }
