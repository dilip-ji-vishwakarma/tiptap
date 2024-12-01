"use client";

import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/lib/api"; 
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";


const templates: any = {
  "tutorial-template" : React.lazy(() => import("@/components/core/Tutorials/Tutorials")), 
};

export const VideoTimeframe = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTabsData = async () => {
      try {
        const response = await fetchDataFromApi(`/api/steps`); 
        setData(response); 
        setActiveTab(response[0]?.label || null); 
        setError(null);
      } catch (err: any) {
        console.error("Error fetching tabs data:", err);
        setError(err.message || "Failed to load data");
      } finally {
      }
    };

    fetchTabsData();
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <NodeViewWrapper className="tabs-youtube">
    <div className="flex h-screen">
      <div className="w-[35%] bg-[#F9FAFB] border-r border-gray-200 p-4">
        <ul className="space-y-6 relative">
          {data.map((tab, index) => (
            <li key={tab.label} className="flex items-center relative">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  activeTab === tab.label
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {activeTab === tab.label && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
              {index !== data.length - 1 && (
                <div
                  className={`absolute left-[11px] top-[40px] h-[57px] w-0.5 ${
                    activeTab === tab.label ? "bg-blue-500" : "bg-gray-400"
                  }`}
                ></div>
              )}
              <button
                className={`ml-4 py-2 text-left transition-colors flex flex-col text-sm ${
                  activeTab === tab.label
                    ? "text-blue-500 font-semibold"
                    : "text-gray-800 hover:text-blue-500"
                }`}
                onClick={() => handleTabClick(tab.label)}
              >
                <span>{tab.label}</span>
                <span>{tab.duration}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[65%] p-6 bg-gray-50">
        {data.map((tab) => {
          const TabTemplate = templates[tab.template];
          if (tab.label !== activeTab) return null;

          return (
            <div key={tab.label}>
              {TabTemplate ? (
                <TabTemplate {...tab} />
              ) : (
                <div className="bg-white p-5">Template Not Found</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
