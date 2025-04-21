import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('recipeAppUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock signup function
  const signup = (email, password, name) => {
    const user = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem('recipeAppUser', JSON.stringify(user))
    setCurrentUser(user)
    return Promise.resolve(user)
  }

  // Mock login function
  const login = (email, password) => {
    // For demo purposes, just check if the email exists
    const storedUser = localStorage.getItem('recipeAppUser')
    if (storedUser && JSON.parse(storedUser).email === email) {
      setCurrentUser(JSON.parse(storedUser))
      return Promise.resolve(JSON.parse(storedUser))
    }
    
    return Promise.reject(new Error('Invalid credentials'))
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('recipeAppUser')
    return Promise.resolve()
  }

  const openLoginModal = () => setLoginModalOpen(true)
  const closeLoginModal = () => setLoginModalOpen(false)

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginModalOpen,
    openLoginModal,
    closeLoginModal
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}