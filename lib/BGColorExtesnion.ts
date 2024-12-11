import Bgbox from '@/components/CustomNode/Bgbox'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export default Node.create({
  name: 'bgcolorextesnion',

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
        tag: 'bgbox-component',
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
    return ['bgbox-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Bgbox)
  },
})
