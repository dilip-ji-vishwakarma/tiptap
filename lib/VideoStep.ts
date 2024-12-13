import { VideoStep } from '@/components/CustomNode/VideoStep';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

interface TabData {
  id: string;
  title: string;
  content: string;
}

const defaultTabs: TabData[] = [
  { id: 'description', title: 'Description', content: '' },
  { id: 'notes', title: 'Notes', content: '' }
];

export default Node.create({
  name: 'VideoYoutube',

  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      url: { 
        default: '',
        parseHTML: (element) => {
          const url = element.getAttribute('data-url');
          return url || '';
        },
        renderHTML: (attributes) => ({
          'data-url': attributes.url
        })
      },
      tabs: {
        default: defaultTabs,
        parseHTML: (element) => {
          const tabsAttribute = element.getAttribute('data-tabs');
          if (tabsAttribute) {
            try {
              const parsedTabs = JSON.parse(tabsAttribute) as TabData[];
              return parsedTabs;
            } catch (error) {
              console.error('Error parsing tabs:', error);
            }
          }
          return defaultTabs;
        },
        renderHTML: (attributes) => ({
          'data-tabs': JSON.stringify(attributes.tabs)
        })
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video-component',
        getAttrs: (node) => {
          return {
            url: node.getAttribute('data-url'),
            tabs: JSON.parse(node.getAttribute('data-tabs') || '[]')
          };
        }
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