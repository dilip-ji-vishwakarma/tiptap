"use client"
import React, { useState } from 'react'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import ReactPlayer from 'react-player'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Grid2x2, AlignVerticalSpaceAround } from 'lucide-react'

interface Tab {
    id: string;
    title: string;
    content: string;
}

export const VideoStep = ({ node, updateAttributes, extension }: any) => {
    const [url, setUrl] = useState(node.attrs.url || '');
    const [tabs, setTabs] = useState<Tab[]>(
        node.attrs.tabs ||
        [
            { id: 'description', title: 'Description', content: '' },
            { id: 'notes', title: 'Notes', content: '' }
        ]
    );
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    // New state to track layout
    const [isVerticalLayout, setIsVerticalLayout] = useState(false);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        updateAttributes({
            url: newUrl,
            tabs: tabs
        });
    };

    const addNewTab = () => {
        const newTabId = `tab-${Date.now()}`;
        const newTabs = [
            ...tabs,
            {
                id: newTabId,
                title: `Tab ${tabs.length + 1}`,
                content: ''
            }
        ];
        setTabs(newTabs);
        setActiveTab(newTabId);
        updateAttributes({
            url,
            tabs: newTabs
        });
    };

    const removeTab = (idToRemove: string) => {
        const newTabs = tabs.filter(tab => tab.id !== idToRemove);
        if (newTabs.length > 0) {
            setTabs(newTabs);
            setActiveTab(newTabs[0].id);
            updateAttributes({
                url,
                tabs: newTabs
            });
        }
    };

    const updateTabTitle = (id: string, newTitle: string) => {
        const newTabs = tabs.map(tab =>
            tab.id === id ? { ...tab, title: newTitle } : tab
        );
        setTabs(newTabs);
        updateAttributes({
            url,
            tabs: newTabs
        });
    };

    // Updated ChangeLayout function to toggle layout
    const ChangeLayout = () => {
        setIsVerticalLayout(!isVerticalLayout);
    };

    return (
        <NodeViewWrapper className="video-component">
            <div className="video-container">
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="Enter YouTube URL"
                    className="w-full p-2 mb-2 border rounded"
                />
                <div className='youtube-embed-style'>
                    {url && (
                        <ReactPlayer
                            url={url}
                            controls={true}
                            width="100%"
                            height={500}
                        />
                    )}
                </div>
                <div className='my-5 flex justify-end'>
                    <button 
                        className='bg-[#D3E3FD] p-[5px] rounded-[5px]' 
                        onClick={ChangeLayout}
                    >
                        {isVerticalLayout ? <Grid2x2 /> : <AlignVerticalSpaceAround />}
                    </button>
                </div>
                <Tabs
                    defaultValue={tabs[0].id}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    orientation={isVerticalLayout ? "vertical" : "horizontal"}
                    className={isVerticalLayout ? "flex" : ""}
                >
                    <TabsList className={`
                        ${isVerticalLayout 
                            ? 'flex-col w-[200px] items-start justify-start shadow-[rgba(149,157,165,0.2)_0px_8px_24px] h-fit space-y-4' 
                            : 'w-full grid-cols-dynamic shadow-md bg-gray p-[10px] flex justify-start flex-wrap h-[unset]'}
                    `}>
                        {tabs.map((tab) => (
                            <div 
                                key={tab.id} 
                                className={`flex items-center ${isVerticalLayout ? 'w-full' : ''}`}
                            >
                                <TabsTrigger
                                    value={tab.id}
                                    className={`
                                        inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                        disabled:pointer-events-none disabled:opacity-50 
                                        data-[state=active]:bg-[#D3E3FD] data-[state=active]:text-foreground data-[state=active]:shadow-sm
                                        ${isVerticalLayout ? 'w-full justify-start' : ''}
                                    `}
                                >
                                    <input
                                        type="text"
                                        value={tab.title}
                                        onChange={(e) => updateTabTitle(tab.id, e.target.value)}
                                        className="w-full bg-transparent focus:outline-none"
                                    />
                                    {tabs.length > 1 && (
                                        <span
                                            onClick={() => removeTab(tab.id)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </span>
                                    )}
                                </TabsTrigger>
                            </div>
                        ))}
                        <button
                            onClick={addNewTab}
                            className="flex items-center justify-center p-2 text-blue-500 hover:text-blue-700"
                        >
                            <Plus size={16} />
                        </button>
                    </TabsList>

                    <div className={`
                        ${isVerticalLayout 
                            ? 'flex-grow pl-4' 
                            : 'w-full'}
                    `}>
                        {tabs.map((tab) => (
                            <TabsContent 
                                key={tab.id} 
                                value={tab.id}
                                className={isVerticalLayout ? 'mt-0' : ''}
                            >
                                <div className="content is-editable">
                                    <textarea
                                        value={tabs.find(t => t.id === tab.id)?.content || ''}
                                        onChange={(e) => {
                                            const newContent = e.target.value;
                                            const newTabs = tabs.map(t =>
                                                t.id === tab.id ? { ...t, content: newContent } : t
                                            );
                                            setTabs(newTabs);
                                            updateAttributes({
                                                url,
                                                tabs: newTabs
                                            });
                                        }}
                                        className="w-full p-2 border rounded min-h-[200px]"
                                        placeholder={`Enter content for ${tab.title}`}
                                    />
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </NodeViewWrapper>
    )
}