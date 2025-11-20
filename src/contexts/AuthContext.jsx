import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('kramik_token')
      if (token) {
        // Simulate token verification - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock user data - replace with actual user data from API
        setUser({
          id: '1',
          name: 'Demo Student',
          email: 'demo@kramik.com',
          userType: 'student',
          walletAddress: null
        })
      }
    } catch (error) {
      localStorage.removeItem('kramik_token')
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call - replace with actual login API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const userData = {
        id: '1',
        name: 'Demo Student',
        email: credentials.email,
        userType: 'student',
        walletAddress: null
      }
      
      setUser(userData)
      localStorage.setItem('kramik_token', 'demo-token')
      
      return {
        user: userData,
        token: 'demo-token'
      }
    } catch (error) {
      setError('Login failed. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call - replace with actual registration API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newUser = {
        id: '2',
        name: userData.name,
        email: userData.email,
        userType: 'student',
        walletAddress: null
      }
      
      setUser(newUser)
      localStorage.setItem('kramik_token', 'demo-token')
      
      return {
        user: newUser,
        token: 'demo-token'
      }
    } catch (error) {
      setError('Registration failed. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const blockchainLogin = async (message, signature, userType) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate blockchain authentication - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const userData = {
        id: '3',
        name: 'Blockchain User',
        email: 'blockchain@kramik.com',
        userType: userType,
        walletAddress: '0x742...d35a'
      }
      
      setUser(userData)
      localStorage.setItem('kramik_token', 'blockchain-token')
      
      return {
        user: userData,
        token: 'blockchain-token'
      }
    } catch (error) {
      setError('Blockchain authentication failed.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
    localStorage.removeItem('kramik_token')
  }

  const updateProfile = async (profileData) => {
    try {
      // Simulate profile update - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedUser = {
        ...user,
        ...profileData
      }
      
      setUser(updatedUser)
      return updatedUser
    } catch (error) {
      setError('Profile update failed.')
      throw error
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    blockchainLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.userType === 'admin',
    isStudent: user?.userType === 'student'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}