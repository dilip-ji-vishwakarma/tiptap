"use client"
import React, { useEffect, useState } from 'react';
import { Preloader } from '../Preloader';
import { Commet } from 'react-loading-indicators';

type ClientProviderProps = {
    children: React.ReactNode
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoading = () => setIsLoading(false);
        const timeoutId = setTimeout(handleLoading, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {isLoading && <div className="flex justify-center items-center h-screen"><Commet color="#6B46C1" size="medium" text="" speedPlus={3} textColor="" /></div>}
            {!isLoading && children}
        </>
    );
};

