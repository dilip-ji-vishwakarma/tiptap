import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import MonacoEditor from '@monaco-editor/react';

export const MonacoCustomNode = ({ node, updateAttributes }: any) => {
    const [code, setCode] = useState(node.attrs.content || '// Start typing your code here...');

    useEffect(() => {
        // Schedule the updateAttributes call to the next microtask
        Promise.resolve().then(() => {
            updateAttributes({ content: code });
        });
    }, [code, updateAttributes]);

    return (
        <NodeViewWrapper className="monaco-component relative">
            <MonacoEditor
                height="500px"
                language="html"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                    selectOnLineNumbers: true,
                    fontSize: 14,
                    minimap: { enabled: false },
                }}
            />
            <NodeViewContent className="content" />
        </NodeViewWrapper>
    );
};
