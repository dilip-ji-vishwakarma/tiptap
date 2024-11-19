"use client"
import { DashboardSidebar } from '@/components/core'
import { EditorProvider } from '@/components/TipTapEditor'
import React from 'react'

const page = () => {
  return (
    <EditorProvider>
    <DashboardSidebar />
    </EditorProvider>

  )
}

export default page