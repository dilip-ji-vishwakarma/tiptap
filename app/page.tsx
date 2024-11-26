"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inside your Login function

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Something went wrong');
      setLoading(false);
      return;
    }

    // Store the entire user data (including token and tokenExpiration) in sessionStorage
    sessionStorage.setItem('userDetails', JSON.stringify({
      token: data.token,
      tokenExpiration: data.tokenExpiration,
      email: data.email, // Add any other user info you need here
      name: data.name,   // Example: user name
    }));

    alert('Login successful!');
    // Redirect to dashboard or other page
  } catch (err) {
    setError('An unexpected error occurred');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 border border-red-600 p-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Page;
