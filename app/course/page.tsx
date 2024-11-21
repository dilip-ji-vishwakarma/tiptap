"use client"
import { DashboardSidebar } from '@/components/core'
import { SnackbarProvider } from '@/components/core/context/SnackbarContext'
import Snackbar from '@/components/core/Snackbar/Snackbar'
import { EditorProvider } from '@/components/TipTapEditor'
import React from 'react'

const page = () => {
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