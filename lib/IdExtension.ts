import { Heading } from '@tiptap/extension-heading';

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.id,
        renderHTML: (attributes) => {
          if (attributes.id) {
            return { id: attributes.id };
          }
          return {};
        },
      },
    };
  },
});
