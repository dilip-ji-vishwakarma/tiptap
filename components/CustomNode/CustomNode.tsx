import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { GridBox } from '../core';

export default () => {
  return (
    <NodeViewWrapper className="react-component">
      <GridBox columns={2} className="items-center gap-4 py-5 shadow-lg p-5 rounded-lg">
        <GridBox.GridItem columnMerge={1}>
          <div contentEditable={true} className="image-wrapper">
            <img
              src="/images/RAM DARBAR.png"
              className="rounded-lg"
              width={700}
              height={700}
              alt="Image"
              draggable="true"
            />
          </div>
        </GridBox.GridItem>
        <GridBox.GridItem columnMerge={1}>
          <p contentEditable={true}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry...`}
          </p>
        </GridBox.GridItem>
      </GridBox>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
