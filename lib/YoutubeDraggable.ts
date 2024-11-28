import { ResizableIframe } from '@/components/core'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export default Node.create({
  name: 'youtubedraggable',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'youtubedraggable-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['youtubedraggable-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableIframe)
  },
})
