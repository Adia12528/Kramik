import React, { useState, useEffect } from 'react'

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [studentData, setStudentData] = useState({
    name: 'Alex Johnson',
    course: 'B.Tech Computer Science & Engineering',
    college: 'Techno-Stream University, Bangalore',
    semester: '6th Semester',
    gpa: '8.7',
    skills: ['React.js', 'Python', 'Data Structures', 'Cloud Computing', 'Machine Learning', 'DevOps']
  })

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    setIsVisible(true)
    // Real educational websites for each subject
    setSubjects([
      { 
        name: 'Data Structures & Algorithms', 
        code: 'DSA', 
        bgColor: 'bg-blue-500', 
        borderColor: 'border-blue-600',
        hoverColor: 'hover:bg-blue-600',
        progress: 75,
        link: 'https://visualgo.net/en',
        description: 'Interactive visualizations for DSA'
      },
      { 
        name: 'Computer Organization', 
        code: 'COA', 
        bgColor: 'bg-red-500', 
        borderColor: 'border-red-600',
        hoverColor: 'hover:bg-red-600',
        progress: 60,
        link: 'https://www.nand2tetris.org/',
        description: 'Build a computer from logic gates'
      },
      { 
        name: 'Automata Theory', 
        code: 'AT', 
        bgColor: 'bg-green-500', 
        borderColor: 'border-green-600',
        hoverColor: 'hover:bg-green-600',
        progress: 85,
        link: 'https://www.tutorialspoint.com/automata_theory/index.htm',
        description: 'Theory of computation tutorials'
      },
      { 
        name: 'Engineering Mathematics', 
        code: 'MATHS', 
        bgColor: 'bg-purple-500', 
        borderColor: 'border-purple-600',
        hoverColor: 'hover:bg-purple-600',
        progress: 70,
        link: 'https://www.khanacademy.org/math',
        description: 'Khan Academy Math courses'
      },
      { 
        name: 'Operating Systems', 
        code: 'OS', 
        bgColor: 'bg-indigo-500', 
        borderColor: 'border-indigo-600',
        hoverColor: 'hover:bg-indigo-600',
        progress: 55,
        link: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        description: 'Operating Systems: Three Easy Pieces'
      },
      { 
        name: 'Database Management', 
        code: 'DBMS', 
        bgColor: 'bg-pink-500', 
        borderColor: 'border-pink-600',
        hoverColor: 'hover:bg-pink-600',
        progress: 80,
        link: 'https://www.sqlitetutorial.net/',
        description: 'SQLite and database tutorials'
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className={`mb-10 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Welcome back, <span className="gradient-text">{studentData.name.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-lg text-gray-600">Ready to continue your learning journey?</p>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className={`col-span-1 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="glass-effect p-8 rounded-2xl shadow-xl sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-5xl text-white font-bold">
                      {studentData.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-4">Personal Profile</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div className="p-3 bg-white rounded-xl border-l-4 border-indigo-500">
                  <p className="text-xs text-gray-500 font-semibold">Full Name</p>
                  <p className="font-bold text-gray-800">{studentData.name}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-l-4 border-purple-500">
                  <p className="text-xs text-gray-500 font-semibold">Course</p>
                  <p className="font-bold text-gray-800">{studentData.course}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-l-4 border-pink-500">
                  <p className="text-xs text-gray-500 font-semibold">Institution</p>
                  <p className="font-bold text-gray-800">{studentData.college}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-semibold">Semester</p>
                    <p className="text-2xl font-bold text-indigo-600">{studentData.semester.split(' ')[0]}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-semibold">GPA</p>
                    <p className="text-2xl font-bold text-green-600">{studentData.gpa}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                📝 Update Profile
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2 space-y-8 mt-8 lg:mt-0">
            {/* Academic Info */}
            <div className={`glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-yellow-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🎓</span>
                <h3 className="text-2xl font-bold text-gray-800">Academic Overview</h3>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">{studentData.course}</p>
              <p className="text-sm text-gray-500">{studentData.college}</p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">Progress:</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-bold text-orange-600">72%</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className={`glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-pink-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">⚡</span>
                <h3 className="text-2xl font-bold text-gray-800">Acquired Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {studentData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                + Add New Skill
              </button>
            </div>

            {/* Quick Actions */}
            <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <button className="glass-effect p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center">
                <span className="text-3xl block mb-2">📊</span>
                <span className="font-bold text-gray-800">View Analytics</span>
              </button>
              <button className="glass-effect p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center">
                <span className="text-3xl block mb-2">🤖</span>
                <span className="font-bold text-gray-800">AI Coach</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className={`mt-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center">
                <span className="mr-3">📚</span>
                Core Engineering Subjects
              </h2>
              <p className="text-gray-600 mt-2">Explore your coursework and track progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <a 
                key={index} 
                href={subject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                style={{ animationDelay: `${1200 + index * 100}ms` }}
              >
                <div className={`glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-l-4 ${subject.borderColor} h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`${subject.bgColor} text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md`}>
                      {subject.code}
                    </span>
                    <svg className={`w-6 h-6 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">{subject.name}</h4>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-600">Progress</span>
                      <span className="text-xs font-bold text-indigo-600">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${subject.bgColor} h-2 rounded-full transition-all duration-500`} 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {subject.description}
                  </p>
                  <p className="text-xs text-indigo-500 flex items-center mt-2 font-semibold">
                    <span className="mr-1">🔗</span> 
                    <span className="group-hover:text-indigo-700 transition-colors">Visit Course Website →</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard