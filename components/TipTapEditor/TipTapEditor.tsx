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
    content: `
  <div><h2>What is React?<br><br class="ProseMirror-trailingBreak"></h2><p>React is an open-source JavaScript library developed by <strong>Facebook</strong> (now Meta) for building user interfaces, particularly for single-page applications where you need to manage dynamic content and user interactions efficiently. React allows developers to build large web applications that can update and render efficiently in response to data changes without reloading the entire page.</p><p>Key features of React include:<br><br class="ProseMirror-trailingBreak"></p><ul><li><p><strong>Component-based architecture</strong>: React encourages the development of reusable UI components that can be composed to create complex UIs.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Declarative UI</strong>: Instead of manually manipulating the DOM (Document Object Model), developers describe how the UI should look based on the current application state, and React handles the rendering.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Virtual DOM</strong>: React uses a virtual representation of the DOM to efficiently update only the parts of the UI that need to change, improving performance.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Unidirectional data flow</strong>: Data flows in one direction from parent to child components, making it easier to manage and debug.<br><br class="ProseMirror-trailingBreak"></p></li></ul><h2>Benefits and Features of React<br><br class="ProseMirror-trailingBreak"></h2><ul><li><p><strong>Reusability</strong>: React promotes the creation of small, isolated components that can be reused throughout an application, reducing code duplication and improving maintainability.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Performance Optimization</strong>: React uses a Virtual DOM to minimize direct manipulation of the real DOM. When state changes, React compares the new Virtual DOM with the previous version (a process called "reconciliation"), calculates the difference, and only updates the real DOM where necessary. This makes React applications fast and efficient, especially when dealing with complex UIs.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Component-based structure</strong>: React's architecture revolves around breaking down UIs into small, independent components. This modularity makes it easier to manage, test, and scale applications.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Declarative Syntax</strong>: React allows developers to describe what the UI should look like at any given time, and React takes care of the process of updating the UI when the data changes. This is more intuitive than imperative programming (where you manually specify how the UI should change).<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Strong Ecosystem and Community</strong>: React has a large, active community and a rich ecosystem of third-party libraries, tools, and frameworks (such as React Router for routing and Redux for state management), which can help you build complex applications faster.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Cross-platform Development</strong>: React Native, an extension of React, allows you to build mobile applications for iOS and Android using the same React concepts and codebase. This can save development time if you need to support multiple platforms.</p></li></ul><h2>How React Compares with Other Frameworks (e.g., Angular, Vue)</h2><h3>React vs. Angular<br><br class="ProseMirror-trailingBreak"></h3><ul><li><p><strong>Type</strong>: Angular is a full-fledged framework, while React is a library. Angular provides a comprehensive set of tools to develop a full application (e.g., routing, forms, HTTP client), whereas React is focused primarily on the view layer (UI rendering). For features like routing and state management in React, you often need to rely on external libraries (e.g., React Router, Redux).<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Learning Curve</strong>: Angular has a steeper learning curve because it comes with more built-in features and concepts like directives, dependency injection, and RxJS (for handling asynchronous events). React is simpler to get started with, but managing state and handling side effects often requires additional libraries or advanced patterns.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Performance</strong>: React typically has better performance in most scenarios because of its efficient Virtual DOM diffing algorithm. Angular, while powerful, can be slower in complex applications due to its two-way data binding and digest cycle.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Development Speed</strong>: React’s modular, component-based approach allows developers to iterate faster and reuse components across different parts of the application. Angular’s full-featured nature may speed up development for larger applications but can sometimes feel more opinionated and less flexible.</p></li></ul><h3>React vs. Vue<br><br class="ProseMirror-trailingBreak"></h3><ul><li><p><strong>Type</strong>: Like React, Vue is a progressive framework for building user interfaces. However, Vue provides more built-in tools than React, such as a built-in router and state management library (<strong>Vuex</strong>), whereas React requires developers to choose and integrate these libraries themselves.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Learning Curve</strong>: Vue has a gentler learning curve compared to Angular and can be easier to integrate into an existing project. While React requires you to learn JSX (which is a mix of JavaScript and HTML), Vue uses a more familiar template syntax that might feel more natural to beginners.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Community and Ecosystem</strong>: React has a larger community and ecosystem, but Vue has been rapidly growing, especially in Asia. However, React’s ecosystem is more mature, with better support from third-party libraries.<br><br class="ProseMirror-trailingBreak"></p></li><li><p><strong>Flexibility</strong>: React provides more flexibility in choosing tools for routing, state management, etc. In contrast, Vue provides a more integrated experience with built-in solutions for common tasks.</p></li></ul><h3>Summary Comparison<br><br class="ProseMirror-trailingBreak"></h3><p><strong>React</strong> is flexible, focused on the UI, and requires external tools for features like routing and state management. It's widely used for building large-scale applications, and its ecosystem is vast.<br><br><strong>Angular</strong> is a comprehensive, opinionated framework that provides everything you need out of the box, but with a steeper learning curve. It’s great for large enterprise applications.<br><br><strong>Vue</strong> is a progressive framework with a lower learning curve and an integrated approach to common tasks. It’s ideal for developers who want a simpler, more structured solution but with flexibility similar to React.<br><br class="ProseMirror-trailingBreak"></p><p>React stands out for its simplicity, performance, and flexibility, especially when combined with other modern JavaScript tools and libraries.</p></div>
`,
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
        className="minimal-tiptap-editor overflow-auto h-full p-10 border-destructive focus-within:border-destructive min-h-[200px]"
        placeholder="Type your description here"
      />
    </div>
  );
};

