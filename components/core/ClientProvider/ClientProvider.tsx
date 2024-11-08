"use client"
import React, { useEffect, useState } from 'react';
import { Preloader } from '../Preloader';

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
            {isLoading && <Preloader />}
            {!isLoading && children}
        </>
    );
};

