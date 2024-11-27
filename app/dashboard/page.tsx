"use client"
import { useUser } from '@/components/context/UserContext';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [courses, setCourses] = useState<any[]>([]); // State to store courses
  const [error, setError] = useState<string>(''); // State to store errors if any
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const { user } = useUser();
  const userId = user?.id; // Replace with the actual user ID
  const storedUserDetails = localStorage.getItem('token');

  const token = storedUserDetails; 

  useEffect(() => {
    // Fetch courses for the user
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/course/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request header
          },
        });

        if (!response.ok) {
          // If response is not OK, throw an error
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch courses');
        } else {
          // If response is OK, parse the JSON and set the courses
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        // Catch and handle any other errors
        setError('An error occurred while fetching the courses');
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchCourses(); // Call the fetchCourses function when the component mounts
  }, [userId, token]); // Re-run the effect if userId or token changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if any
  }

  return (
    <div>
      <h1>Courses</h1>
      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        <ul>
          {courses.map((course: any) => (
            <li key={course.id}>{course.sheetname}</li> // Display the course names or any other info
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
