"use client";
import { DashboardHeader } from '@/components/core';
import { useState, useEffect } from 'react';

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/category', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
        } else {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error); // For debugging
        setError('Something went wrong while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <DashboardHeader />
      <h1>Welcome to the Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {categories.length === 0 ? (
        <p>No categories found.</p> // Display a message if no categories are found
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
                <a href={`/course?category_id=${category.id}`}>
                {category.category_name}
                </a>
                </li> // Ensure these fields are correct
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
