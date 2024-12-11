import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default () => {
  return (
    <NodeViewWrapper className="bgbox-component">
        
        <NodeViewContent className="content is-editable bg-[#1E90FF] p-5" />
    </NodeViewWrapper>
  )
}