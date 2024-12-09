import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default () => {
  return (
    <NodeViewWrapper className="react-component">
       <div>
       <span>Note:</span>
       <NodeViewContent className="content is-editable" />
       </div> 
      
    </NodeViewWrapper>
  )
}