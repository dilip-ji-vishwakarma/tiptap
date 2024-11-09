"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('course?id=introduction-to-react');
  }, [router]);

  return <></>;
};

export default Page;
