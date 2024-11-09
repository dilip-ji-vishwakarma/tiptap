"use client"
import React, { useEffect } from 'react'
import { Portal } from '../core'
import { Toolbar } from './Toolbar'
import { TipTapEditor } from './TipTapEditor'
import { EditorProvider } from './EditorContext'

export const TapEditor = ({courses}: any) => {

    const string = courses.map((item: any) => item.editor_string).join(' ');
    console.log(string)
    return (
        <EditorProvider>
            <Portal id="tooltip-toolbar">
                <Toolbar />
            </Portal>
            <TipTapEditor content={string} />
        </EditorProvider>
    )
}
