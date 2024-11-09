import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useEditorContext } from "./EditorContext";
import { CustomHeading } from "@/lib/IdExtension";

interface TipTapEditorProps {
  content: string; // Assuming content is a string; change if it's different
}

export const TipTapEditor = ({ content }: TipTapEditorProps) => {
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
      CustomHeading,
    ],
    content: '',
    onCreate: () => {
      console.log("Editor created");
    },
    onUpdate: ({ editor }) => {
      console.log("Editor content updated:", editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content); // Set content with HTML including IDs
      setCurrentEditor(editor);
    }

    return () => {
      setCurrentEditor(null);
    };
  }, [content, editor, setCurrentEditor]);

  return (
    <div className="editor-container mt-[109px] max-w-[80%] w-full" onClick={() => setCurrentEditor(editor)}>
      <EditorContent
        editor={editor}
        className="minimal-tiptap-editor overflow-auto h-full p-10 border-destructive focus-within:border-destructive min-h-[200px]"
        placeholder="Type your description here"
      />
    </div>
  );
};
