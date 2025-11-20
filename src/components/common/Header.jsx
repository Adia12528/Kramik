import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBlockchain } from '../../contexts/BlockchainContext'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isConnected, currentAccount, connectWallet } = useBlockchain()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/login', label: 'Login', icon: '🔐', highlight: true },
    { path: '/admin', label: 'Admin', icon: '⚙️', admin: true }
  ]

  return (
    <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
              <span className="text-2xl">🎓</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider group-hover:text-indigo-300 transition-colors">
              Kramik
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? link.admin
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg transform scale-105'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : link.highlight
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                      : link.admin
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet Status (Desktop) */}
          <div className="hidden md:block ml-4">
            {isConnected ? (
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-500 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-mono">
                  {currentAccount?.slice(0, 6)}...{currentAccount?.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-sm"
              >
                🔗 Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 text-white transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? link.admin
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : link.admin
                      ? 'bg-red-600/80 hover:bg-red-700 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-gray-200'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet Connection Button */}
          <div className="px-4 pt-3 mt-2 border-t border-white/20">
            {isConnected ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-mono">
                  {currentAccount?.slice(0, 6)}...{currentAccount?.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
              >
                🔗 Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header