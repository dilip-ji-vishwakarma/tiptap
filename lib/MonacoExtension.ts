import { MonacoCustomNode } from '@/components/CustomNode/MonacoCustomNode'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export default Node.create({
  name: 'MonacoComponent',

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
        tag: 'monaco-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['monaco-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MonacoCustomNode)
  },
})
