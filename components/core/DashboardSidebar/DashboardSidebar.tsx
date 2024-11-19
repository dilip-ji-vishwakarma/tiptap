"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataFromApi } from "@/lib/api";
import { EditorProvider, Toolbar } from "@/components/TipTapEditor";
import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import TapEditor from "@/components/TipTapEditor/TapEditor";
import { ChevronDown, ChevronUp } from 'lucide-react';

const templates: any = {
  "tiptap-editor": TapEditor,
};

export const DashboardSidebar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [courses, setCourses] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toolbar, setToolbar] = useState(false);

  useEffect(() => {
    const fetchStepsData = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi(`/api/tutorials`);
        setCourses(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching courses data:", err);
        setError(err.message || "Failed to load courses data");
      } finally {
        setLoading(false);
      }
    };

    fetchStepsData();
  }, []);

  useEffect(() => {
    if (courses.length > 0 && id) {
      const tempStartStep = courses.find(course => course.url === `/course/?id=${id}`);
      setCurrentStep(tempStartStep);
    }
  }, [id, courses]);

  const toggleSidebar = () => {
    setToolbar(!toolbar); // Toggle the sidebar state
  };

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (error && courses.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <EditorProvider >
      <div className="relative">
        <div className="space-y-3 fixed top-0 z-[1] bg-white w-full">
          <Header />
          <div className="lg:block hidden"> 
            <Toolbar />
          </div>
          <div className="border-b  border-[#c7c7c7]"></div>
        </div>
      </div>
      <div className="flex gap-5 px-5 fixed md:top-[122px] top-[70px] h-[100vh] overflow-scroll w-full">
        <div className="max-w-[20%] w-full lg:block hidden">
          {courses.length > 0 ? (
            <SidebarProvider>
              <AppSidebar data={courses} />;
            </SidebarProvider>
          ) : (
            <div>No data available for the sidebar</div>
          )}
        </div>
        <div className="lg:max-w-[58%] max-w-full w-full">
          {currentStep && (
            <React.Fragment key={currentStep.id}>
              {templates[currentStep?.template] ? (
                React.createElement(templates[currentStep.template], {
                  step: currentStep,
                  courses: courses,
                  editorString: currentStep.editor_string,
                })
              ) : (
                <div className="bg-white p-5 ">Template Not Found</div>
              )}
            </React.Fragment>
          )}
        </div>

        <div className="max-w-[22%] w-full lg:block hidden">
          <div id="comment-portal" className="sticky top-[0px]"></div>
        </div>
      </div>
      <div className={`lg:hidden fixed ${toolbar ? 'bottom-0' : 'bottom-[-156px]'} transition-all`}>
        <span onClick={toggleSidebar} className="flex justify-end px-2">{toolbar ? <ChevronDown className="bg-black text-white" /> : <ChevronUp className="bg-black text-white" />}</span>
        <Toolbar />
      </div>
    </EditorProvider>
  );
};
