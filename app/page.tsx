"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; 
import { useUser } from '@/components/context/UserContext';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, loading } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const role = user?.role

  useEffect(() => {
    const checkExistingToken = () => {
      if (typeof window !== 'undefined') {
        const storedUserDetails = localStorage.getItem('token');
        if (storedUserDetails) {
          setIsAuthenticated(true);
        }
      }
    };

    checkExistingToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/login', { 
        email: email.trim(), 
        password 
      });

      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        // if (role === 'user') {
        //   router.push('/user-dashboard');
        // } else if (role === 'admin') {
        //   router.push('/dashboard');
        // } else {
        //   throw new Error('Unauthorized role');
        // }
      }
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred';
      
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              errorMessage = 'Invalid email or password';
              break;
            case 403:
              errorMessage = 'Access denied';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later';
              break;
            default:
              errorMessage = err.response.data.message || 'Login failed';
          }
        } else if (err.request) {
          errorMessage = 'No response from server. Please check your connection';
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        
        {error && (
          <p className="text-red-500 text-center bg-red-50 p-3 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder-gray-400 w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-800"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder-gray-400 w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-800 pr-10"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 text-white rounded-md focus:outline-none flex items-center justify-center ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;