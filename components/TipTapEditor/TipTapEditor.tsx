import React, { useState } from "react";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { useEditorContext } from "./EditorContext";
import { CustomHeading } from "@/lib/IdExtension";
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Mention from '@tiptap/extension-mention';
import suggestion from '../core/Mention/Suggestion';
import { CommentMark } from "@/lib/CommentMark";
import { DocBreadcrumb } from "../core";
import { useSearchParams } from "next/navigation";
import Image from '@tiptap/extension-image';
import ResizeImage from "tiptap-extension-resize-image";
import Youtube from '@tiptap/extension-youtube';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ReactComponent from '@/lib/NodeExtension';
import Heading from '@tiptap/extension-heading';
import MonacoComponent from "@/lib/MonacoExtension";
import { useSnackbar } from "../core/context/SnackbarContext";

interface TipTapEditorProps {
  editorString: any;
  onFocus: () => void;
  ids: number;
}

const TipTapEditor = ({ editorString, onFocus, ids }: TipTapEditorProps) => {
  const { dispatch } = useSnackbar();
  const [content, setContent] = useState<string>(editorString);
  const { setCurrentEditor } = useEditorContext();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Underline,
      Subscript,
      Superscript,
      CommentMark,
      ResizeImage,
      Code,
      Document,
      Blockquote,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      ReactComponent,
      MonacoComponent,
      Youtube.configure({
        controls: false,
        nocookie: true,
        allowFullscreen: false,
      }),
      Image.configure({
        inline: false,
      }),
      Highlight.configure({ multicolor: true }),
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
          const modifiedId = node.attrs.id.replace(/\s+/g, '-');
          const link = node.attrs.link || `course?id=introduction-to-react#${modifiedId}`;
          return [
            'a',
            mergeAttributes({ href: link }, options.HTMLAttributes),
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
          ]
        },
      }),
      CustomHeading,
    ],
    content: editorString,
    onCreate: () => {
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      setContent(JSON.stringify(newContent));
    },
    onFocus: () => {
      if (onFocus) {
        onFocus();
      }
    },
  });

  const saveEditorContent = async () => {

    if (editor) {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { message: 'Saving...', type: 'info' },
      });
      const updatedContent = editor.getJSON();
      try {
        const response = await fetch(`/api/tutorials/${ids}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ editor_string: updatedContent }),
        });

        if (!response.ok) {
          throw new Error('Failed to update content');
        }

        const result = await response.json();
        dispatch({
          type: 'SHOW_SNACKBAR',
          payload: { message: 'Saved', type: 'success' },
        });
      } catch (error) {
        dispatch({
          type: 'SHOW_SNACKBAR',
          payload: { message: 'Error saving content', type: 'error' },
        });
      }
    }
  };

  const handleBlur = () => {
    saveEditorContent();
  };

  return (
    <div className="mt-5 mb-20">
      <DocBreadcrumb path={`skilline.ai/course?id=${id}`} />
      <div className="editor-container w-full bg-white border mt-3 pb-[150px] border-[#c7c7c7]" onClick={() => { setCurrentEditor(editor); }}>
        <EditorContent
          editor={editor}
          className="minimal-tiptap-editor lg:overflow-auto md:p-10 p-6 border-destructive focus-within:border-destructive lg:h-[100vh]"
          placeholder="Type your description here"
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default TipTapEditor;