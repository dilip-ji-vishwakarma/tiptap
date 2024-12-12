import { VideoStep } from '@/components/CustomNode/VideoStep';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

export default Node.create({
  name: 'VideoYoutube',

  group: 'inline',
  inline: true, 

  addAttributes() {
    return {
      url: { 
        default: '',
        parseHTML: (element) => element.getAttribute('data-url'),
        renderHTML: (attributes) => ({
          'data-url': attributes.url
        })
      },
      content: { default: '' },
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoStep);
  },
});