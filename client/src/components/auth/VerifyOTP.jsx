import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axiosInstance from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function VerifyOTP({ email, onBack, testMode = false }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();
  const { login } = useAuth();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post('/auth/otp/verify', {
        email,
        otp
      });

      if (response.data.token) {
        // Persist and sync auth state across tabs
        login(response.data.token);
        toast.success('Login successful!');
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to verify OTP';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    
    try {
      const response = await axiosInstance.post('/auth/otp/resend', { email });
      if (response.data.testMode) {
        toast.success(response.data.message, { duration: 10000 });
      } else {
        toast.success(response.data.message);
      }
      setTimeLeft(600); // Reset timer
      setOtp(''); // Clear current OTP
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to resend OTP';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="/lcc-logo.png"
            alt="LCCSahib"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </p>
          {testMode && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Test Mode:</strong> Email configuration not set up. 
                Check the server console for the OTP code.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B9797] focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength="6"
                />
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-600">
                  Code expires in{' '}
                  <span className="font-medium text-red-600">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="text-sm text-red-600 font-medium">
                  OTP has expired. Please request a new one.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6 || timeLeft === 0}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3B9797] hover:bg-[#2d7575] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B9797] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </button>
              
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || timeLeft > 540} // Can resend after 1 minute
                className="text-sm text-[#3B9797] hover:text-[#2d7575] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check your email inbox for the OTP</li>
              <li>• The code is valid for 10 minutes</li>
              <li>• If you don't see the email, check your spam folder</li>
              <li>• You can request a new OTP after 1 minute</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
