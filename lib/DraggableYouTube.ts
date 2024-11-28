import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state'; // Import ProseMirror Plugin
import { EditorView } from 'prosemirror-view';

const DraggableYouTube = Extension.create({
  name: 'draggableYouTube',

  addNode() {
    return {
      content: 'inline',
      group: 'block',
      inline: true,
      draggable: true,
      atom: true,

      parseHTML() {
        return [
          {
            tag: 'iframe[src^="https://www.youtube.com"]',
          },
        ];
      },

      renderHTML({ node }: any) {
        return [
          'div',
          { class: 'youtube-video' },
          [
            'iframe',
            {
              src: node.attrs.src,
              frameborder: '0',
              allowfullscreen: true,
              width: '100%',
              height: '100%',
            },
          ],
        ];
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mousedown: (view: EditorView, event: MouseEvent) => {
              const target = event.target as HTMLElement;

              // Check if it's a YouTube video
              if (target && target.closest('.youtube-video')) {
                const video = target.closest('.youtube-video') as HTMLElement;
                let offsetX = 0;
                let offsetY = 0;
                let isDragging = false;

                // Enable absolute positioning for dragging
                video.style.position = 'absolute';
                video.style.zIndex = '100';

                // Set initial position
                const initialRect = video.getBoundingClientRect();
                video.style.left = `${initialRect.left}px`;
                video.style.top = `${initialRect.top}px`;

                // Handle the mouse down event
                video.addEventListener('mousedown', (e) => {
                  isDragging = true;
                  offsetX = e.clientX - video.getBoundingClientRect().left;
                  offsetY = e.clientY - video.getBoundingClientRect().top;

                  // Prevent default behavior
                  e.preventDefault();
                });

                // Handle mouse move event
                const handleMouseMove = (e: MouseEvent) => {
                  if (isDragging) {
                    video.style.left = `${e.clientX - offsetX}px`;
                    video.style.top = `${e.clientY - offsetY}px`;
                  }
                };

                // Handle mouse up event
                const handleMouseUp = () => {
                  isDragging = false;
                  video.style.zIndex = ''; // Reset z-index after drag
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                // Add mousemove and mouseup event listeners
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);

                // Prevent default behavior
                event.preventDefault();
                return true;
              }

              return false;
            },
          },
        },
      }),
    ];
  },
});

export default DraggableYouTube;
