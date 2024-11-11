"use client"
import React from 'react'

import { TipTapEditor } from './TipTapEditor'

export const TapEditor = ({ courses }: any) => {

    const string = courses.map((item: any) => item.editor_string).join(' ');
    return (
        <TipTapEditor content={string} />
    )
}
