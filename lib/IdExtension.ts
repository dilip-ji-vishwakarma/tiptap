import { Heading } from '@tiptap/extension-heading';
import { v4 as uuidv4 } from 'uuid';

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        // Ensure an ID is always generated if not present
        renderHTML: (attributes) => {
          const id = attributes.id || uuidv4();
          // Modify the attributes to always include the ID
          attributes.id = id;
          return { id };
        },
        parseHTML: (element) => element.id || uuidv4(),
      },
      class: {
        default: null,
        parseHTML: (element) => element.className || null,
        renderHTML: (attributes) => {
          return attributes.class ? { class: attributes.class } : {};
        },
      },
    };
  },

  // Ensure that the `id` is preserved when parsing HTML
  parseHTML() {
    return [
      {
        tag: 'h1, h2, h3, h4, h5, h6',
        getAttrs: (element) => {
          return {
            id: element.id || uuidv4(),
          };
        },
      },
    ];
  },

  // Optional: Add a method to ensure ID is added during node creation
  addNodeAttributes(node:any) {
    if (!node.attrs.id) {
      node.attrs.id = uuidv4();
    }
    return node;
  },
});