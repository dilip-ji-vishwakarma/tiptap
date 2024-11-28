"use client"
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

export const ResizableIframe = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);
    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <NodeViewWrapper className="youtubedraggable-component">
        <Draggable axis="both" handle=".handle" position={position} onStop={handleDrag} nodeRef={draggableRef}>
            <div ref={draggableRef} className='handle cursor-move p-5 bg-[#F3F3F3] w-max'>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3WnK03df6aE?si=8KXPP8c4sBhqSGlF" allowFullScreen ></iframe>
            </div>
        </Draggable>
        <NodeViewContent className="content" />
        </NodeViewWrapper>
    );
};
