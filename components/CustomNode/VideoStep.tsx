import React, { useState } from 'react'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import ReactPlayer from 'react-player'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const VideoStep = ({ node, updateAttributes }: any) => {
    // Extract the URL from node attributes, defaulting to an empty string
    const [url, setUrl] = useState(node.attrs.url || '');

    // Handler to update the URL
    const handleUrlChange = (e: any) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        // Update the node attributes with the new URL
        updateAttributes({
            url: newUrl,
            content: node.attrs.content || ''
        });
    };

    return (
        <NodeViewWrapper className="video-component">
            <div className="video-container">
                {/* URL Input Field */}
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="Enter YouTube URL"
                    className="w-full p-2 mb-2 border rounded"
                />

                {url && (
                    <ReactPlayer
                        url={url}
                        controls={true}
                        width="100%"
                        height={500}
                    />
                )}

                <Tabs defaultValue="description" className="mt-4 py-5">
                    <TabsList className='grid w-full grid-cols-2 shadow-md bg-gray'>
                        <TabsTrigger value="description" className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#D3E3FD] data-[state=active]:text-foreground data-[state=active]:shadow-sm'>Description</TabsTrigger>
                        <TabsTrigger value="notes" className=' inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#D3E3FD] data-[state=active]:text-foreground data-[state=active]:shadow-sm'>Notes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">  <NodeViewContent className="content is-editable border p-5"/></TabsContent>
                    <TabsContent value="notes">  <NodeViewContent className="content is-editable border p-5"/></TabsContent>
                </Tabs>

            </div>
        </NodeViewWrapper>
    )
}