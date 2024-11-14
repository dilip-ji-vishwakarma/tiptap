import { Mark } from '@tiptap/core';

export const CommentMark = Mark.create({
  name: 'comment',
  
  addAttributes() {
    return {
      id: {
        default: null, // Allow id to be passed dynamically
      },
      class: {
        default: 'comment', // Default class for styling
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { id, class: className } = HTMLAttributes;
    return ['span', { class: className, id: id, ...HTMLAttributes }];
  },
});
