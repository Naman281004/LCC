import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth.jsx';
import Verify2FA from '../components/auth/Verify2FA';
import VerifyOTP from '../components/auth/VerifyOTP';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [testMode, setTestMode] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: trimmedEmail,
        password
      });

      if (response.data.status === 'otp_required') {
        setTempEmail(response.data.email);
        setTestMode(response.data.testMode || false);
        setShowOTP(true);
        if (response.data.testMode) {
          toast.success(response.data.message, { duration: 10000 });
        } else {
          toast.success(response.data.message);
        }
      } else if (response.data.status === '2fa_required') {
        setTempEmail(response.data.email);
        setShow2FA(true);
      } else if (response.data.token) {
        login(response.data.token);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.error || 'Invalid request');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showOTP) {
    return (
      <VerifyOTP 
        email={tempEmail} 
        testMode={testMode}
        onBack={() => {
          setShowOTP(false);
          setPassword('');
          setTestMode(false);
        }} 
      />
    );
  }

  if (show2FA) {
    return (
      <Verify2FA 
        email={tempEmail} 
        onBack={() => {
          setShow2FA(false);
          setPassword('');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Sign in to manage certificates</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
              autoComplete="email"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(59, 151, 151, 0.5)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
              autoComplete="current-password"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(59, 151, 151, 0.5)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
            style={{ backgroundColor: isLoading ? '#9CA3AF' : '#3B9797' }}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#2d7575')}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#3B9797')}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <a href="/" className="text-sm hover:opacity-80" style={{ color: '#3B9797' }}>
              Back to Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

