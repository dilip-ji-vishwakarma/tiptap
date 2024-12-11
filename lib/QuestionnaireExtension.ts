import { DynamicQuestionnaire } from '@/components/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'questionnaireComponent',
  group: 'inline',
  inline: true,
  
  addAttributes() {
    return {
      questionnaire: {
        default: null,
        parseHTML: (element) => {
          const questionnaireData = element.getAttribute('data-questionnaire');
          return questionnaireData ? JSON.parse(questionnaireData) : null;
        },
        renderHTML: (attributes) => {
          return attributes.questionnaire 
            ? { 'data-questionnaire': JSON.stringify(attributes.questionnaire) }
            : {};
        }
      }
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
    return ReactNodeViewRenderer(DynamicQuestionnaire);
  },
});