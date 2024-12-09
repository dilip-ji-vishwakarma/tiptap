import { Node, mergeAttributes } from '@tiptap/core';

export const DrawBox = Node.create({
  name: 'drawBox',

  group: 'block',

  content: 'drawBox*', // Allow nesting drawBox nodes inside

  draggable: true,

  addOptions() {
    return {
      borderColor: 'blue',
    };
  },

  addAttributes() {
    return {
      width: {
        default: 200,
      },
      height: {
        default: 100,
      },
      borderColor: {
        default: 'blue',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-draw-box]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-draw-box': true,
        style: `
          border: 2px solid ${HTMLAttributes.borderColor};
          width: ${HTMLAttributes.width}px;
          height: ${HTMLAttributes.height}px;
          resize: both;
          overflow: auto;
          position: relative;
        `,
      }),
      0,
    ];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const container = document.createElement('div');
      container.setAttribute('data-draw-box', 'true');
      container.style.border = `2px solid ${node.attrs.borderColor}`;
      container.style.width = `${node.attrs.width}px`;
      container.style.height = `${node.attrs.height}px`;
      container.style.resize = 'both';
      container.style.overflow = 'auto';
      container.style.position = 'relative';

      // Create the ability to draw a box inside
      let isDrawing = false;
      let startX = 0;
      let startY = 0;
      const newBox = document.createElement('div');
      newBox.style.position = 'absolute';
      newBox.style.border = '2px dashed #000';
      newBox.style.pointerEvents = 'none'; // Disable interaction during drawing
      container.appendChild(newBox);

      // Mouse events for drawing the new box inside the container
      container.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
        newBox.style.left = `${startX}px`;
        newBox.style.top = `${startY}px`;
        newBox.style.width = '0px';
        newBox.style.height = '0px';
        container.style.cursor = 'crosshair';
      });

      container.addEventListener('mousemove', (e) => {
        if (isDrawing) {
          const width = e.offsetX - startX;
          const height = e.offsetY - startY;
          newBox.style.width = `${width}px`;
          newBox.style.height = `${height}px`;
        }
      });

      container.addEventListener('mouseup', (e) => {
        if (isDrawing) {
          isDrawing = false;
          container.style.cursor = 'default';

          // After the user stops drawing, save the new box as a "drawBox" node
          const width = parseInt(newBox.style.width);
          const height = parseInt(newBox.style.height);

          // Add the new drawn box as a nested node
          editor
            .chain()
            .focus()
            .insertContentAt(getPos(), {
              type: 'drawBox',
              attrs: {
                width,
                height,
                borderColor: 'red', // or any dynamic color
              },
            })
            .run();

          // Reset for next drawing
          newBox.style.width = '0px';
          newBox.style.height = '0px';
        }
      });

      return {
        dom: container,
        contentDOM: container,
      };
    };
  },
});
