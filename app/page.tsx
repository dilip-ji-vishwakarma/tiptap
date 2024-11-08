"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/course');
  }, [router]);

  return <></>;
};

export default Page;
