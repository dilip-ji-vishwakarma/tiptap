import { Heading } from '@tiptap/extension-heading';

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),  
      id: {
        default: null,
        parseHTML: (element) => element.id || null,  
        renderHTML: (attributes) => {
          if (attributes.id) {
            return { id: attributes.id };  
          }
          return {}; 
        },
      },
      class: {
        default: null,
        parseHTML: (element) => element.className || null, 
        renderHTML: (attributes) => {
          if (attributes.class) {
            return { class: attributes.class };  
          }
          return {};  
        },
      },
    };
  },
});
