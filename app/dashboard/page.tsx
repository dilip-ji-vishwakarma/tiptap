"use client";
import React, { useEffect, useState } from 'react';

const page = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {userDetails ? (
        <div>
          <h1>Welcome, {userDetails.name}</h1>
          <p>Your email: {userDetails.email}</p>
          <p>Token: {userDetails.token}</p>
          <p>Token Expiration: {userDetails.tokenExpiration}</p>
          <p>Other details: {JSON.stringify(userDetails, null, 2)}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default page;
