"use client";   

import React, { createContext, useContext, useState } from "react";
import { Editor } from "@tiptap/core";

interface EditorContextType {
  currentEditor: Editor | null;
  setCurrentEditor: (editor: Editor | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEditor, setCurrentEditor] = useState<Editor | null>(null);

  return (
    <EditorContext.Provider value={{ currentEditor, setCurrentEditor }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
