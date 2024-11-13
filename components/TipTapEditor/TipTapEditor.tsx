import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useEditorContext } from "./EditorContext";
import { CustomHeading } from "@/lib/IdExtension";
import Link from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Mention from '@tiptap/extension-mention'
import suggestion from '../core/Mention/Suggestion'
import { CommentStore } from "./CommentStore";
interface TipTapEditorProps {
  content: string; // Assuming content is a string; change if it's different
}

export const TipTapEditor = ({ content }: TipTapEditorProps) => {
  const { setCurrentEditor } = useEditorContext();
  const [commentStorage, setCommentStorage] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Underline,
      Subscript,
      Superscript,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Mention.configure({
        suggestion,
        renderHTML({ options, node }) {
          console.log("node.attrs", node.attrs);
          const modifiedId = node.attrs.id.replace(/\s+/g, '-');
          const link = node.attrs.link || `course?id=introduction-to-react#${modifiedId}`;
          console.log("adsfadsfadsf",  node.attrs.link);
          return [
            'a',
            mergeAttributes({ href: link }, options.HTMLAttributes),
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
          ]
        },
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
      <CommentStore comments={commentStorage} />
    </div>
  );
};
