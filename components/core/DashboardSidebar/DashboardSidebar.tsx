"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataFromApi } from "@/lib/api";
import { EditorProvider, TapEditor } from "@/components/TipTapEditor";
import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const templates: any = {
  "tiptap-editor": TapEditor,
};

export const DashboardSidebar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [courses, setCourses] = useState<any[]>([]); // Store courses data
  const [currentStep, setCurrentStep] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStepsData = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi(`/api/tutorials`); // Fetch course data from API
        setCourses(data); // Ensure the response is an array of course data
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
      // Find the course based on the `id` query param
      const tempStartStep = courses.find(course => course.url === `/course/?id=${id}`);
      setCurrentStep(tempStartStep);
    }
  }, [id, courses]);

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (error && courses.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <div className="max-w-[20%] w-full">
        {courses.length > 0 ? (
          <SidebarProvider>
            {courses.map((course, index) => (
              <AppSidebar key={index} data={course} />
            ))}
          </SidebarProvider>
        ) : (
          <div>No data available for the sidebar</div>
        )}
      </div>

      {/* Render the steps (submenu) of the selected course */}
      {currentStep && (
        <EditorProvider>
          <React.Fragment key={currentStep.id}>
            {templates[currentStep?.template] ? (
              // Render the corresponding component (e.g., TipTapEditor)
              React.createElement(templates[currentStep.template], {
                step: currentStep, // Pass currentStep data as a prop to the template component
                courses: courses,   // Pass the entire courses data
              })
            ) : (
              <div className="bg-white p-5 ">Template Not Found</div>
            )}
          </React.Fragment>
        </EditorProvider>
      )}
    </div>
  );
};
