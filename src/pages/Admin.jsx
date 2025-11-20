import React, { useState, useEffect } from 'react'

const Admin = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({
    totalStudents: 1247,
    activeCourses: 52,
    pendingApprovals: 8,
    systemHealth: 98
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-red-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-10 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Admin Portal, <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Dr. Sharma</span> 👨‍💼
          </h1>
          <p className="text-lg text-gray-600">Manage platform, users, and content</p>
        </div>

        {/* Stats Dashboard */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <div className="glass-effect p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Students</p>
                <p className="text-3xl font-extrabold text-blue-600 mt-2">{stats.totalStudents}</p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Courses</p>
                <p className="text-3xl font-extrabold text-green-600 mt-2">{stats.activeCourses}</p>
              </div>
              <span className="text-4xl">📚</span>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Pending Approvals</p>
                <p className="text-3xl font-extrabold text-orange-600 mt-2">{stats.pendingApprovals}</p>
              </div>
              <span className="text-4xl">⏳</span>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">System Health</p>
                <p className="text-3xl font-extrabold text-purple-600 mt-2">{stats.systemHealth}%</p>
              </div>
              <span className="text-4xl">💚</span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Admin Profile */}
          <div className={`col-span-1 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="glass-effect p-8 rounded-2xl shadow-xl sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-5xl text-white font-bold">S</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs">⚙️</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-4">Admin Profile</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div className="p-3 bg-white rounded-xl border-l-4 border-red-500">
                  <p className="text-xs text-gray-500 font-semibold">Full Name</p>
                  <p className="font-bold text-gray-800">Dr. Kavita Sharma</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-l-4 border-orange-500">
                  <p className="text-xs text-gray-500 font-semibold">Organization</p>
                  <p className="font-bold text-gray-800">Kramik Platform Management</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-l-4 border-purple-500">
                  <p className="text-xs text-gray-500 font-semibold">Department</p>
                  <p className="font-bold text-gray-800">Computer Science</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-l-4 border-blue-500">
                  <p className="text-xs text-gray-500 font-semibold">Contact</p>
                  <p className="font-bold text-gray-800">+91 98765 43210</p>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                🔧 Update Admin Info
              </button>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="col-span-2 space-y-6 mt-8 lg:mt-0">
            {/* Content Management */}
            <div className={`glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-orange-600 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📝</span>
                <h3 className="text-2xl font-bold text-gray-800">Content Management</h3>
              </div>
              <p className="text-gray-600 mb-6">Upload new subject links, documents, or announcements.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  📤 Upload Material
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  📢 Post Announcement
                </button>
              </div>
            </div>

            {/* User Management */}
            <div className={`glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-gray-700 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">👥</span>
                <h3 className="text-2xl font-bold text-gray-800">User & Security Management</h3>
              </div>
              <p className="text-gray-600 mb-6">Review student accounts and audit security logs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:from-gray-800 hover:to-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  👤 View Users
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  🔐 Security Logs
                </button>
              </div>
            </div>

            {/* Analytics */}
            <div className={`glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-green-600 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📊</span>
                <h3 className="text-2xl font-bold text-gray-800">Analytics & Reports</h3>
              </div>
              <p className="text-gray-600 mb-6">View platform analytics and generate reports.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  📈 View Analytics
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  📋 Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin