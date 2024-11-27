'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

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
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder-gray-400 w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-800"
              
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
