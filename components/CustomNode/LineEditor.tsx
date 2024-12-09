import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export const LineEditor = () => {
  return (
    <NodeViewWrapper className="lineEditor-component">
      <div className="lineEditor-container">
        <NodeViewContent className="content is-editable bg-white p-2.5 lineeditor" />
      </div>
    </NodeViewWrapper>
  )
}
