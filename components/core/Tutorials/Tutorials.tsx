"use client";
import React, { useEffect, useState } from 'react';
import { TutorialsTemplate } from './TutorialsTemplate';
import { fetchDataFromApi } from '@/lib/api';

export const Tutorials = ({ entity }: any) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = `${entity}`; 
    
        const getData = async () => {
          try {
            const response = await fetchDataFromApi(url); 
            setData(response);
            setError(null);
          } catch (err: any) {
            setError(err.message || 'Unknown error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        getData();
      }, [entity]);

    if (loading) return <p>Loading</p>;
    if (error) return <div className='bg-white p-5 w-full'>{error}</div>;
    if (!data) return <div className='bg-white p-5 w-full'>No data found</div>;

    return (
        <>
           <TutorialsTemplate data={data} />
        </>
    );
};

