import React, { useCallback, useState } from "react";
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
import { DocBreadcrumb, Portal } from "../core";
import { useSearchParams } from "next/navigation";
import Image from '@tiptap/extension-image';
import ResizeImage from "tiptap-extension-resize-image";
import Youtube from '@tiptap/extension-youtube';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import NoticeComponent from "@/lib/Notice"
import VideoYoutube from "@/lib/VideoStep"
import Heading from '@tiptap/extension-heading';
import MonacoComponent from "@/lib/MonacoExtension";
import questionnaireComponent from "@/lib/QuestionnaireExtension";
import debounce from "lodash/debounce";
import YoutubeDraggable from "@/lib/YoutubeDraggable";
import TabYoutube from "@/lib/TabYoutube";
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Gapcursor from '@tiptap/extension-gapcursor'
import { DrawBox } from "@/lib/DrawBox";
import Lineeditor from "@/lib/Lineeditor";
import BGColorExtesnion from "@/lib/BGColorExtesnion";
import { extractHeadings } from "@/lib/toc";

interface TipTapEditorProps {
  editorString: any;
  onFocus: () => void;
  courses: any;
}

const TipTapEditor = ({ editorString, onFocus, courses }: TipTapEditorProps) => {
  const [content, setContent] = useState<string>(editorString);
  const [toc, setToc] = useState<{ text: string; level: number; id: string }[]>([]);

  const { setCurrentEditor } = useEditorContext();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const categoryId = searchParams.get("category_id");

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
      VideoYoutube,
      TabYoutube,
      Gapcursor,
      DrawBox,
      Lineeditor,
      NoticeComponent,
      BGColorExtesnion,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],

      }),
      questionnaireComponent,
      YoutubeDraggable,
      MonacoComponent,
      Youtube.configure({
        controls: false,
        nocookie: true,
        allowFullscreen: false,
        inline: true,
        HTMLAttributes: {
          class: 'youtube-video draggable-video',
        },
      }),
      Image.configure({
        inline: true,
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
    onCreate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      const headings = extractHeadings(jsonContent);
      console.log('Initial Headings:', headings);
      setToc(headings);
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      const headings = extractHeadings(newContent);
      console.log('Updated Headings:', headings);
      setToc(headings);  // Update the headings when content changes
      setContent(JSON.stringify(newContent));
      saveEditorContent(newContent);
    },
    onFocus: () => {
      if (onFocus) {
        onFocus();
      }
    },
  });



  const saveEditorContent = useCallback(
    debounce(async (updatedContent: any) => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/api/petchcourses?category_id=${categoryId}&id=${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ editor_string: updatedContent }),
        });

        if (!response.ok) {
          throw new Error("Failed to save content");
        }
        console.log("Content saved successfully");
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }, 1000),
    []
  );




  return (
    <div className="mt-5 mb-20">
      <DocBreadcrumb path={`skilline.ai/course?id=${id}`} />
      <Portal id='tiptap-toc'>
        <ul className="p-[10px] space-y-4 max-h-[178px] overflow-y-auto min-h-[auto] md:block hidden" >
          {toc.map((heading, index) => (
            <li key={index} className="text-[16px]" style={{ marginLeft: `${heading.level * 10}px` }}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </Portal>
      <div className="editor-container w-full bg-white border mt-3 pb-[150px] border-[#c7c7c7]" onClick={() => { setCurrentEditor(editor); }}>
        <EditorContent
          editor={editor}
          className="minimal-tiptap-editor lg:overflow-auto md:p-10 p-6 border-destructive focus-within:border-destructive lg:h-[100vh]"
          placeholder="Type your description here"
        />
      </div>
    </div>
  );
};

export default TipTapEditor;