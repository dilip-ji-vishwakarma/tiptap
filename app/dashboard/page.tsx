"use client";
import { useUser } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not logged in. Please log in.</p>;

  const storedUserDetails = localStorage.getItem('token');

  if(!storedUserDetails) {
    router.push("/")
  }


  return (
    <div className="flex flex-col items-center justify-center">

        <div>
          <h1>Welcome, {user.id}</h1>
          <p>Your email: {user.email}</p>
          <p>Token: {user.fullname}</p>
        </div>

    </div>
  );
};

export default page;
