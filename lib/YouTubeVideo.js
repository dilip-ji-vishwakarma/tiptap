import { Node } from '@tiptap/core';

export const YouTubeVideo = Node.create({
  name: 'youtube',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 640,
      },
      height: {
        default: 480,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', HTMLAttributes];
  },

  addCommands() {
    return {
      setYouTubeVideo:
        ({ src, width, height }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { src, width, height },
          });
        },
    };
  },
});
