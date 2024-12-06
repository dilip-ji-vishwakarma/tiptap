"use client"
import { Heading } from '@/components/core'
import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import { useUser } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';

export const CourseCreation = () => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async () => {  
    const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        return;
      }

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
        window.location.reload();
      } else {
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  }
  

  return (
    <div className='bg-[#F1F3F4] pb-10'>
      <div className='container mx-auto'>
        <Heading className='text-[rgb(32,33,36)] md:text-[17px] md:font-normal md:leading-[64px] sanse'>Start a new document</Heading>
        <button className='w-36 h-[183px] bg-[white] flex justify-center items-center' onClick={handleSubmit}>
          <Plus />
        </button>
      </div>
    </div>
  )
}
