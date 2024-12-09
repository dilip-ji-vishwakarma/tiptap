import { Questionnaire } from '@/components/core';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'questionnaireComponent',

  // Set it to be an inline node
  group: 'inline', // Inline group

  inline: true, 

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'questionnaire-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['questionnaire-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Questionnaire);
  },
});
