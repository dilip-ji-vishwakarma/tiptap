"use client"
import { DashboardSidebar } from '@/components/core'
import { SnackbarProvider } from '@/components/core/context/SnackbarContext'
import Snackbar from '@/components/core/Snackbar/Snackbar'
import { EditorProvider } from '@/components/TipTapEditor'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const storedUserDetails = localStorage.getItem('token');
    if (!storedUserDetails) {
      router.push("/");
    }
  }, [router]);

  return (
    <EditorProvider>
      <SnackbarProvider>
        <DashboardSidebar />
        <Snackbar />
      </SnackbarProvider>
    </EditorProvider>

  )
}

export default page