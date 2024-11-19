import React, { useState } from 'react';
import { MonacoEditor } from '../core';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Play } from 'lucide-react';

export const MonacoCustomNode = () => {
    const [code, setCode] = useState('// Start typing your code here...');
    const [output, setOutput] = useState<string | null>(null);
    const [hasRunCode, setHasRunCode] = useState(false); // Track if code execution has occurred

    const executeCode = () => {
        // Capture console.log output
        const logs: string[] = [];
        const originalConsoleLog = console.log;

        console.log = (...args: any[]) => {
            logs.push(args.map(arg => String(arg)).join(' '));
            originalConsoleLog(...args); // Keep default behavior for debugging
        };

        try {
            const result = eval(code);
            console.log('Execution result:', result);
        } catch (error) {
            console.error('Execution error:', error);
            logs.push(`Error: ${String(error)}`);
        } finally {
            console.log = originalConsoleLog; // Restore original console.log
        }

        setOutput(logs.join('\n'));
        setHasRunCode(true); // Mark code as executed
    };

    return (
        <NodeViewWrapper className="monaco-component relative">
            <div className='absolute z-[1] bg-[#D3E3FD] flex justify-center items-center right-2.5 top-[15px]'>
                <button onClick={executeCode}><Play /></button>
            </div>
            <MonacoEditor
                value={code}
                language="javascript"
                onChange={(value) => setCode(value || '')}
            />

            {hasRunCode && ( // Only show the output if the code has been run
                <div style={{ marginTop: '20px', background: '#2d2d2d', color: 'white', padding: '10px' }}>
                    <h4>Output:</h4>
                    <pre>{output || 'No output yet.'}</pre>
                </div>
            )}

            <NodeViewContent className="content" />
        </NodeViewWrapper>
    );
};
