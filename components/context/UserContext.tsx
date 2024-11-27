"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  fullname: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps>({ user: null, loading: true });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/getUserDetails', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            setUser(data.user); 
          }
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
