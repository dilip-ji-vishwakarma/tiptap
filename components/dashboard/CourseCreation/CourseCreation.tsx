"use client"
import { Heading } from '@/components/core'
import React, { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react';
import { useUser } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';

export const CourseCreation = () => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {  
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found');
      return;
    }

    // Reset previous errors
    setError(null);
    // Set loading state
    setIsLoading(true);

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user?.id,
          category_name: "United Document"
        }), 
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Category added successfully:', data);
        // Redirect to the new course's URL
        router.push(`/course/?category_id=${data.category_id}`);
      } else {
        setError(data.message || 'Failed to create course');
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.error('Error during POST request:', error);
      setError('An unexpected error occurred');
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  }
  
  return (
    <div className='bg-[#F1F3F4] pb-10'>
      <div className='container mx-auto'>
        <Heading className='text-[rgb(32,33,36)] md:text-[17px] md:font-normal md:leading-[64px] sanse'>
          Start a new document
        </Heading>
        <button 
          className='w-36 h-[183px] bg-[white] flex justify-center items-center relative' 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin absolute text-gray-500" size={24} />
          ) : (
            <Plus />
          )}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}