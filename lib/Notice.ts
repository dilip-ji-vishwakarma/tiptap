import Notice from '@/components/CustomNode/Notice'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export default Node.create({
  name: 'noticecomponent',

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
        tag: 'react-component',
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
    return ['react-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Notice)
  },
})
