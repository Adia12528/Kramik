import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Security',
      description: 'Secure authentication using blockchain technology for tamper-proof student records.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: '📚',
      title: 'Unified Subjects',
      description: 'Access all engineering subjects from different platforms in one centralized hub.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🤖',
      title: 'AI Learning Coach',
      description: 'Get personalized study recommendations and project ideas powered by AI.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 animate-float">
            <span className="text-6xl">🎓</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="gradient-text">Kramik</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
            The next-generation engineering education platform secured by blockchain technology.
            Access all your engineering subjects in one place with enhanced security and AI-powered learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/dashboard"
              className="bg-white text-indigo-700 px-10 py-4 rounded-xl font-bold text-lg border-2 border-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-effect p-8 rounded-2xl shadow-xl card-hover ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: '10K+', label: 'Active Students' },
            { number: '50+', label: 'Engineering Courses' },
            { number: '100%', label: 'Secure Records' },
            { number: '24/7', label: 'AI Support' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`}
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of engineering students who are already experiencing the future of education.
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-indigo-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home