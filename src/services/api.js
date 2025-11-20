import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kramik_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('kramik_token')
      window.location.href = '/login'
    }
    
    const message = error.response?.data?.error || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  blockchainLogin: (data) => api.post('/auth/blockchain-login', data),
  verifyToken: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout'),
}

export const studentAPI = {
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  updateSkills: (skills) => api.patch('/students/skills', { skills }),
  uploadProfileImage: (formData) => api.post('/students/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  createSubject: (data) => api.post('/admin/subjects', data),
  updateSubject: (id, data) => api.put(`/admin/subjects/${id}`, data),
  deleteSubject: (id) => api.delete(`/admin/subjects/${id}`),
}

export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getByCategory: (category) => api.get(`/subjects/category/${category}`),
  getBySemester: (semester) => api.get(`/subjects/semester/${semester}`),
  search: (query) => api.get(`/subjects/search?q=${query}`),
}

export const geminiAPI = {
  getStudyAdvice: (data) => api.post('/gemini/study-advice', data),
  analyzeSubject: (data) => api.post('/gemini/analyze-subject', data),
  generateProjectIdeas: (data) => api.post('/gemini/project-ideas', data),
}

export default api