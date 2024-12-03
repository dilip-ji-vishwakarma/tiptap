"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Toolbar } from "@/components/TipTapEditor";
import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import { ChevronDown, ChevronUp, TableOfContents } from 'lucide-react';
import { MenuTab } from "../MenuTab";


const templates: any = {
  "tiptap-editor": React.lazy(() => import("@/components/TipTapEditor/TipTapEditor")),
};

export const DashboardSidebar = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const categoryId = searchParams.get("category_id");
  const [courses, setCourses] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toolbar, setToolbar] = useState(false);
  const [menutool, setMenuTool] = useState(false);
  const [toc, setToc] = useState(false);

  useEffect(() => {
    const fetchStepsData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token provided");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/courses?category_id=${categoryId}`, {
          method: 'GET', // Or POST depending on the API
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
          },
        });
        

        if (!response.ok) {
          throw new Error('Failed to fetch courses data');
        }

        const data = await response.json();
        setCourses(data.courses);
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
    if (courses.length > 0) {
      const tempStartStep = courses.find(course => 
        course.url === `/course?category_id=${categoryId}&id=${courseId}`
      );
      console.log(tempStartStep, "tempStartStep");      
      setCurrentStep(tempStartStep);
    }
  }, [courseId, courses]);

  const toggleSidebar = () => {
    setToolbar(!toolbar);
  };


  const handleEditorFocus = () => {
    setMenuTool(true);
    setToc(true);
  };


  if (loading) return <div>Loading.....</div>;
  if (error && courses.length === 0) return <div>Error: {error}</div>;

  return (
    <>
      <div className="relative">
        <div className="space-y-3 fixed top-0 z-[1] bg-white w-full">
          <Header />
          <div className="lg:block hidden">
            <Toolbar />
          </div>
          <div className="border-b  border-[#c7c7c7]"></div>
        </div>
      </div>
      <div className="flex md:gap-5 md:px-5 px-3 fixed md:top-[122px] top-[70px] h-[100vh] overflow-scroll w-full">
        <div className="md:max-w-[20%] w-full lg:block hidden">
          <SidebarProvider><AppSidebar data={courses} /></SidebarProvider>
        </div>
        <div className="lg:max-w-[58%] max-w-full w-full">
          {currentStep && (
            <React.Fragment key={currentStep.id}>
              {templates[currentStep?.template] ? (
                React.createElement(templates[currentStep.template], {
                  step: currentStep,
                  courses: courses,
                  editorString: currentStep.editor_string,
                  onFocus: handleEditorFocus,
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

      {menutool ? (
        <div className={`lg:hidden fixed ${toolbar ? 'bottom-0' : 'bottom-[-156px]'} transition-all`}>
          {toc ? (
            <button type="button" onClick={() => setMenuTool(false)} className="justify-center flex w-[45px] h-[45px] bg-[#C2E7FF] items-center absolute top-[-60px] rounded-[10px] right-2">
              <TableOfContents />
            </button>
          ) : null}
          <span onClick={toggleSidebar} className="flex justify-end px-2">{toolbar ? <ChevronDown className="bg-black text-white" /> : <ChevronUp className="bg-black text-white" />}</span>
          <Toolbar />
        </div>
      ) : (
        <div className="fixed w-full bg-[white] bottom-0 lg:hidden">
          {courses.length > 0 ? (
            <MenuTab data={courses} />
          ) : (
            <div>No data available for the sidebar</div>
          )}
        </div>
      )}
    </>
  );
};