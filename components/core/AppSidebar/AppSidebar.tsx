"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MenuMaker } from "./MenuMaker";
import { useState } from "react";
import { ListMinus } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
  submenu?: SubmenuItem[];
};

type AppSidebarProps = {
  data: TutorialItem[];
};

export const AppSidebar = ({ data }: AppSidebarProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id"); 
  
  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null); // Track the currently open submenu

  // Show a warning when data is empty
  if (data.length === 0) {
    return <div className="text-center text-red-500 font-semibold">Warning: No data available</div>;
  }

  // Toggle submenu open/close
  const handleSubmenuToggle = (id: number) => {
    setOpenSubmenuId((prevId) => (prevId === id ? null : id)); // Close if same item is clicked, else open new
  };

  // Compare the path and query parameter to set active state
  const isActive = (itemUrl: string) => {
    const pathMatches = pathName === itemUrl;
    const queryMatches = courseId && itemUrl.includes(`?id=${courseId}`);
    return pathMatches || queryMatches;
  };

  return (
    <Sidebar className="border-none mt-[122px]">
      <SidebarContent className="bg-[#F9FBFD]">
        <SidebarGroup>
          {/* Removed SidebarTrigger */}
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
                      onClick={() => handleSubmenuToggle(item.id)}
                    >
                      <Link href={item.url}>
                        <ListMinus />
                        <span>{item.label}</span>
                      </Link>
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
