import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBlockchain } from '../contexts/BlockchainContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { connectWallet, signMessage, isConnected } = useBlockchain()
  const [activeTab, setActiveTab] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      if (showRegister) {
        // Registration
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters')
          setIsLoading(false)
          return
        }
        // Simulate registration
        await new Promise(resolve => setTimeout(resolve, 1500))
        setShowRegister(false)
        setError('')
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        alert('Registration successful! Please login.')
      } else {
        // Login
        await login({ email: formData.email, password: formData.password, userType: activeTab })
        navigate(activeTab === 'admin' ? '/admin' : '/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        setError('Please install MetaMask to use blockchain authentication')
        setIsLoading(false)
        return
      }
      
      // Connect wallet
      const account = await connectWallet()
      
      // Create message to sign
      const message = `Kramik Authentication\nAddress: ${account}\nTime: ${new Date().toISOString()}`
      
      // Sign message
      const signature = await signMessage(message)
      
      // Authenticate with signature
      await login({ 
        walletAddress: account, 
        signature, 
        message,
        userType: activeTab 
      })
      
      navigate(activeTab === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to connect wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-2xl animate-fadeInUp">
          {/* Logo/Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold gradient-text mb-2">Kramik Login</h1>
            <p className="text-gray-500">Secure access to your learning hub</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex space-x-3 mb-8 bg-gray-100 p-1.5 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('student')
                setError('')
                setFormData({ email: '', password: '' })
              }}
              className={`flex-1 py-3 font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'student' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => {
                setActiveTab('admin')
                setError('')
                setFormData({ email: '', password: '' })
              }}
              className={`flex-1 py-3 font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'admin' 
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-fadeIn">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {activeTab === 'student' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {showRegister ? 'Student Registration' : 'Student Login'}
              </h2>
              
              {/* Blockchain Authentication */}
              <div className="glass-effect p-6 rounded-xl border-2 border-purple-200">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🔐</span>
                  <h3 className="font-bold text-purple-700">Blockchain Authentication</h3>
                </div>
                <p className="text-sm text-purple-600 mb-4">
                  Connect your wallet for secure, decentralized login
                </p>
                <button 
                  onClick={handleWalletConnect}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 font-medium">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              
              {/* Traditional Login/Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {showRegister && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email {!showRegister && '/ Enrollment ID'}
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    placeholder={showRegister ? "Enter your email" : "Enter your email or enrollment ID"}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                {showRegister && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : showRegister ? 'Create Account' : 'Login to Dashboard'}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegister(!showRegister)
                      setError('')
                      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                  >
                    {showRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'admin' && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Access</h2>
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 text-sm">
                  <span className="font-bold">⚠️ Warning:</span> Admin access is restricted. Unauthorized access attempts are logged.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Admin Username
                  </label>
                  <input 
                    type="text" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                    placeholder="Enter admin username"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                    placeholder="Enter admin password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : 'Secure Login'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login