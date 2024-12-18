import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Tab, TabList, Tabs as ReactTabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AlignVerticalSpaceAround, Grid2x2, Plus, Trash } from 'lucide-react';

interface TabData {
    name: string;
    content: string;
    duration: string;
}

export const VideoStep = ({ node, updateAttributes }: any) => {
    const [url, setUrl] = useState(node.attrs.url || '');

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        updateAttributes({ url: newUrl });
    };

    const [activeTab, setActiveTab] = useState(0);
    const [isVerticalLayout, setIsVerticalLayout] = useState(true);
    const [tabData, setTabData] = useState<TabData[]>(node.attrs.tabs && Array.isArray(node.attrs.tabs) && node.attrs.tabs.length > 0 ? node.attrs.tabs : []);

    const handleAddTab = () => {
        const newTab: TabData = {
            name: `New Tab ${tabData.length + 1}`,
            content: '',
            duration: '00:00:00 to 00:00:00',
        };
        const updatedTabs = [...tabData, newTab];
        setTabData(updatedTabs);
        updateAttributes({ tabs: updatedTabs });
    };

    const handleRemoveTab = (index: number) => {
        const updatedTabs = tabData.filter((_, i) => i !== index);
        setTabData(updatedTabs);
        updateAttributes({ tabs: updatedTabs });
        setActiveTab((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleTabChange = (index: number, field: keyof TabData, value: string) => {
        const updatedTabs = tabData.map((tab, i) =>
            i === index ? { ...tab, [field]: value } : tab
        );
        setTabData(updatedTabs);
        updateAttributes({ tabs: updatedTabs });
    };

    const handleLayoutChange = () => {
        setIsVerticalLayout((prev) => !prev);
    };

    return (
        <NodeViewWrapper className="tabs-youtube">
            <input
                type="text"
                value={url} // Ensure `url` is always controlled
                onChange={handleUrlChange}
                placeholder="Enter YouTube URL"
                className="w-full p-2 mb-2 border rounded"
            />
            <div className="youtube-embed-style">
                {url && (
                    <ReactPlayer
                        url={url}
                        controls={true}
                        width="100%"
                        height={500}
                    />
                )}
            </div>

            <div className="my-5 flex justify-between items-center">
                <button
                    className="bg-[#D3E3FD] p-[5px] rounded-[5px]"
                    onClick={handleLayoutChange}
                >
                    {isVerticalLayout ? <Grid2x2 /> : <AlignVerticalSpaceAround />}
                </button>
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleAddTab}
                >
                    <Plus className="inline-block mr-1" /> Add Tab
                </button>
            </div>

            <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-row'} max-w-4xl mx-auto`}>
                <div className={`${isVerticalLayout ? 'w-full border-b border-gray-200' : 'w-[47%]'} overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}>
                    <ReactTabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                        <TabList className={`flex ${isVerticalLayout ? 'flex-row space-x-4' : 'flex-col space-y-4'}`}>
                            {tabData.map((tab, index) => (
                                <Tab
                                    key={index}
                                    className={`relative  py-2 cursor-pointer flex flex-col focus-visible:outline-none whitespace-nowrap ${activeTab === index ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    <div className="font-medium flex justify-between items-center">
                                        <input
                                            type="text"
                                            value={tab.name}
                                            onChange={(e) => handleTabChange(index, 'name', e.target.value)}
                                            placeholder="Tab Name"
                                            className="bg-transparent text-inherit focus:outline-none"
                                        />
                                        <button
                                            className="ml-2 text-red-500 hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveTab(index);
                                            }}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                    <div className="text-sm">
                                        <input
                                            type="text"
                                            value={tab.duration}
                                            onChange={(e) => handleTabChange(index, 'duration', e.target.value)}
                                            placeholder="Duration"
                                            className="bg-transparent text-inherit focus:outline-none text-sm"
                                        />
                                    </div>
                                </Tab>
                            ))}
                        </TabList>
                    </ReactTabs>
                </div>
                <div className={`${isVerticalLayout ? 'w-full' : 'w-full'}`}>
                    <div className={`${isVerticalLayout ? 'w-full py-4 ' : 'w-full pl-4'}`}>
                        <ReactTabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
                            {tabData.map((tab, index) => (
                                activeTab === index && (
                                    <textarea
                                        key={index}
                                        value={tab.content}
                                        onChange={(e) => handleTabChange(index, 'content', e.target.value)}
                                        placeholder="Tab Content"
                                        className="w-full h-52 p-2 border rounded mt-2"
                                    />
                                )
                            ))}
                        </ReactTabs> 
                    </div>
                </div>
            </div>

            <NodeViewContent className="content hidden" />
        </NodeViewWrapper>
    );
};
