import { LineEditor } from '@/components/CustomNode/LineEditor'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export default Node.create({
  name: 'lineEditor',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      note: {
        default: 'Note',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'lineEditor-component',
      },
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor.chain().insertContentAt(this.editor.state.selection.head, { type: this.type.name }).focus().run()
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['lineEditor-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(LineEditor)
  },
})
