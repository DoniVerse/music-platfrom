// API utility functions for authentication

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.confirmPassword - Password confirmation
 * @returns {Promise<Object>} Registration response
 */
async function registerUser(userData) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    return data
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Login response with user data and session
 */
async function loginUser(credentials) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Store user session in localStorage
 * @param {Object} session - Session data from login response
 * @param {Object} user - User data from login response
 */
function storeSession(session, user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('session', JSON.stringify(session))
    localStorage.setItem('user', JSON.stringify(user))
  }
}

/**
 * Get stored session from localStorage
 * @returns {Object|null} Session data or null if not found
 */
function getStoredSession() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('session')
    return session ? JSON.parse(session) : null
  }
  return null
}

/**
 * Get stored user from localStorage
 * @returns {Object|null} User data or null if not found
 */
function getStoredUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  return null
}

/**
 * Clear stored session and user data
 */
function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('session')
    localStorage.removeItem('user')
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
function isAuthenticated() {
  const session = getStoredSession()
  if (!session) return false

  // Supabase returns expires_at as a unix timestamp in SECONDS
  // Support both seconds and an ISO string just in case
  const nowMs = Date.now()
  let expiresAtMs = null

  if (typeof session.expires_at === 'number') {
    // Treat numbers as seconds
    expiresAtMs = session.expires_at * 1000
  } else if (typeof session.expires_at === 'string') {
    const parsed = Date.parse(session.expires_at)
    if (!Number.isNaN(parsed)) {
      expiresAtMs = parsed
    }
  }

  if (expiresAtMs !== null && nowMs >= expiresAtMs) {
    clearSession()
    return false
  }

  return true
}

export {
  registerUser,
  loginUser,
  storeSession,
  getStoredSession,
  getStoredUser,
  clearSession,
  isAuthenticated
}
