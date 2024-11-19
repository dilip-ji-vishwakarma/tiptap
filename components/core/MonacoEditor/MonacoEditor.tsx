'use client'
import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
  });

  type EditorProps = {
    value: string;
    language: string;
    onChange: (value: string | undefined) => void;
  }

export const MonacoEditor = ({value, language, onChange}: EditorProps) => {
    
  return (
    <Editor
      height="500px"
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      options={{
        theme: 'vs-dark', 
      }}
    />
  )
}
