import { Questionnaire } from '@/components/core';
import { VideoTimeframe } from '@/components/CustomNode/VideoTimeframe';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'TabYoutube',

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
        tag: 'tabs-youtube',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['tabs-youtube', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoTimeframe);
  },
});
