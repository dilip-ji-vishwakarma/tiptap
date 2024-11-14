import { Mark, markInputRule } from '@tiptap/core';

export const CommentMark = Mark.create({
  name: 'comment',

  // Render HTML with the custom class and id
  renderHTML({ HTMLAttributes }) {
    // Generate a unique ID for each comment (you can change this logic)
    const commentId = HTMLAttributes['data-comment-id'] || new Date().getTime().toString();

    // Return the span with the class and the id attribute
    return ['span', { class: 'comment', id: commentId, ...HTMLAttributes }];
  },
});
