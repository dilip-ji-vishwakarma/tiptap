"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { MenuMaker } from "./MenuMaker";
import { useState } from "react";
import { Heart, ListMinus } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { fetchDataFromApi } from "@/lib/api";

type SubmenuItem = {
  id: number;
  course_id: number;
  label: string;
  url: string;
};

type TutorialItem = {
  id: number;
  label: string;
  url: string;
  bookmark: any;
  submenu?: SubmenuItem[];
};

type AppSidebarProps = {
  data: TutorialItem[];
};

export const AppSidebar = ({ data }: AppSidebarProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);
  const [courses, setCourses] = useState(data);

  if (data.length === 0) {
    return <div className="text-center text-red-500 font-semibold">Warning: No data available</div>;
  }

  const handleSubmenuToggle = (id: number) => {
    setOpenSubmenuId((prevId) => (prevId === id ? null : id));
  };

  const isActive = (itemUrl: string) => {
    const pathMatches = pathName === itemUrl;
    const queryMatches = courseId && itemUrl.includes(`?id=${courseId}`);
    return pathMatches || queryMatches;
  };

  const handleBookmarkToggle = async (dataId: number) => {
    const course = courses.find((course) => course.id === dataId);
    if (!course) return;
  
    // Toggle bookmark value directly
    const updatedBookmarkValue = course.bookmark === 0 ? 1 : 0;
  
    console.log(course.bookmark)
    try {
      // Pass the updated bookmark value directly in the PATCH request
      const response = await fetchDataFromApi(`/api/tutorials/${dataId}`, {
        method: 'PATCH',
        body: JSON.stringify({ bookmark: updatedBookmarkValue }), // Directly use the toggled value
      });
  
      if (response.ok) {
        // Update state with the new bookmark value after successful API call
        const updatedCourses = courses.map((course) => {
          if (course.id === dataId) {
            course.bookmark = updatedBookmarkValue; // Set the toggled value directly
          }
          return course;
        });
        setCourses(updatedCourses); // Update the state with the new course list
      } else {
        console.error("Failed to update bookmark");
      }
    } catch (err) {
      console.error("Error updating bookmark:", err);
    }
  };
  
  

  return (
    <Sidebar className="border-none mt-[122px]">
      <SidebarContent className="bg-[#F9FBFD]">
        <SidebarGroup>
          <div className="mt-[60px]">
            <SidebarGroupLabel className="flex items-center justify-between text-[#444746] text-md font-light leading-5">
              <span>Document Tabs</span>
              <MenuMaker />
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-3">
              <SidebarMenu className="px-1">
                {data.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      className={`bg-[#D3E3FD] rounded-full mb-2 text-base font-medium h-[41px] p-[15px] ${isActive(item.url) ? "bg-[#D3E3FD]" : "bg-[#F4F4F5]"}`}
                    >
                      <div>
                        <span className="flex justify-between w-full items-center">
                          <span onClick={() => handleSubmenuToggle(item.id)}>
                            <Link href={item.url} className="flex gap-3 w-full items-center">
                              <ListMinus />
                              <span>{item.label}</span>
                            </Link>
                          </span>
                          <button
                      onClick={() => handleBookmarkToggle(item.id)}
                      className="ml-2"
                    >
                      {item.bookmark === 1 ? (
                        <Heart className="text-yellow-500" />
                      ) : (
                        <Heart className="text-gray-500" />
                      )}
                    </button>
                        </span>
                      </div>
                    </SidebarMenuButton>

                    {item.submenu && item.submenu.length > 0 && (
                      <SidebarMenu
                        className={`ml-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSubmenuId === item.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        {item.submenu.map((submenuItem) => (
                          <SidebarMenuItem key={submenuItem.id}>
                            <SidebarMenuButton asChild>
                              <Link href={submenuItem.url}>
                                <span>{submenuItem.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
