import axios from 'axios';

const inferDefaultBaseURL = () => {
  // 1. Check for explicit environment variable
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }

  // 2. If on Vercel production, use production backend
  if (typeof window !== 'undefined') {
    const host = window.location.hostname || '';
    
    // If frontend is on Vercel (but not localhost), use production backend
    if (host.endsWith('vercel.app') && !host.startsWith('localhost')) {
      console.log('Detected Vercel deployment, using production API');
      return 'https://lcc-qvi2.vercel.app/api';
    }
  }

  // 3. Local development fallback
  console.log('Using local development API');
  return 'http://localhost:5000/api';
};

const baseURL = inferDefaultBaseURL();

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // Set to true if you need cookies
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  (error) => {
    // Log error details
    if (error.response) {
      console.error(`❌ ${error.response.status} - ${error.config?.url}`);
      console.error('Error details:', error.response.data);
      
      // Handle authentication errors
      if (error.response.status === 403 || error.response.status === 401) {
        // Token expired or invalid
        if (window.location.pathname.startsWith('/admin') && 
            window.location.pathname !== '/admin/login') {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
        }
      }
    } else if (error.request) {
      console.error('❌ No response received:', error.message);
      console.error('This might be a CORS or network issue');
    } else {
      console.error('❌ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

console.log('Axios configured with base URL:', baseURL);

export default axiosInstance;