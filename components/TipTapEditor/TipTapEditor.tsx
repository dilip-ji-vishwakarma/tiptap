"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { useEditorContext } from "./EditorContext";

export const TipTapEditor = () => {
  const { setCurrentEditor } = useEditorContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: "<p>Type your content here...</p>",
    onCreate: () => {
      console.log("Editor created");
    },
    onUpdate: ({ editor }) => {
      console.log("Editor content updated:", editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      setCurrentEditor(editor);
    }

    return () => {
      setCurrentEditor(null);
    };
  }, [editor, setCurrentEditor]);

  return (
    <div className="editor-container" onClick={() => setCurrentEditor(editor)}>
      <EditorContent
        editor={editor}
        className="minimal-tiptap-editor overflow-auto h-full p-5 border-destructive focus-within:border-destructive min-h-[200px]"
        placeholder="Type your description here"
      />
    </div>
  );
};

