import axios from 'axios';

const inferDefaultBaseURL = () => {
  // Prefer explicit env var
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  // If running on Vercel frontend and no env set, point to deployed backend
  if (typeof window !== 'undefined') {
    const host = window.location.hostname || '';
    if (host.endsWith('vercel.app') && !host.startsWith('localhost')) {
      return 'https://lcc-qvi2.vercel.app/api';
    }
  }

  // Local dev fallback
  return 'http://localhost:5000/api';
};

const axiosInstance = axios.create({
  baseURL: inferDefaultBaseURL(),
});

// Add request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Token expired or invalid
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

