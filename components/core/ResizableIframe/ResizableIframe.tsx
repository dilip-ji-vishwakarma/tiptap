"use client"
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

type ResizableIframeProps = {
    videoUrl: string;
}

export const ResizableIframe = ({ videoUrl }: ResizableIframeProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);
    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <Draggable axis="both" handle=".handle" position={position} onStop={handleDrag} nodeRef={draggableRef}>
            <div ref={draggableRef} className='handle cursor-move p-5 bg-[#F3F3F3] w-max'>
                <iframe width="100%" height="100%" src={videoUrl} allowFullScreen className='w-[800px] h-[500px]'></iframe>
            </div>
        </Draggable>
    );
};
