import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Verify2FA({ email, onBack }) {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/auth/2fa/verify', {
        email,
        token
      });

      login(response.data.token);
      toast.success('Authentication successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Invalid verification code');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none text-center text-2xl tracking-widest"
              autoComplete="off"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(59, 151, 151, 0.5)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || token.length !== 6}
            className="w-full text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
            style={{ backgroundColor: (isLoading || token.length !== 6) ? '#9CA3AF' : '#3B9797' }}
            onMouseEnter={(e) => !(isLoading || token.length !== 6) && (e.target.style.backgroundColor = '#2d7575')}
            onMouseLeave={(e) => !(isLoading || token.length !== 6) && (e.target.style.backgroundColor = '#3B9797')}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

