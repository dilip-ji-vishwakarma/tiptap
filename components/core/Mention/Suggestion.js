import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import MentionList from './MentionList.jsx'

export default {
    items: ({ query }) => {
        return [
          { text: 'Introduction to React', link: 'course?id=introduction-to-react' },
          { text: 'What is React?', link: 'course?id=what-is-react' },
          { text: 'Benefits and features of React', link: 'course?id=benefits-of-react' },
          { text: 'How React compares with other frameworks', link: 'course?id=react-vs-other-frameworks' },
        ]
          .filter(item => item.text.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 5);
      },

    render: () => {
        let component
        let popup

        return {
            onStart: props => {
                component = new ReactRenderer(MentionList, {
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })
            },

            onUpdate(props) {
                component.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup[0].destroy()
                component.destroy()
            },
        }
    },
}