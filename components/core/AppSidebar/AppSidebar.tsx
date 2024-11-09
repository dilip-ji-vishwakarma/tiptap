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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MenuMaker } from "./MenuMaker";
import { useEffect, useState } from "react";
import { ListMinus } from "lucide-react";
import Link from "next/link";

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
  submenu?: SubmenuItem[]; // Each course can have a submenu
};

type AppSidebarProps = {
  data: TutorialItem; // We are passing a single course (TutorialItem) here
};

export const AppSidebar = ({ data }: AppSidebarProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});

  // Ensure that the data is an array and properly formatted
  if (!data || !data.id || !data.label) {
    return <div className="text-center text-red-500 font-semibold">Error: Invalid data format</div>;
  }

  // Toggle submenu open/close
  const handleSubmenuToggle = (id: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Show a warning when data is empty
  if (data.submenu && data.submenu.length === 0) {
    return <div className="text-center text-red-500 font-semibold">Warning: No submenu available</div>;
  }

  return (

      <Sidebar className="border-none p-3 mt-[109px]">
        <SidebarContent className="bg-[#F9FBFD] ">
          <SidebarGroup>
            <div className="fixed left-0">
              <SidebarTrigger size="lg" />
            </div>
            <div className="mt-[60px]">
              <SidebarGroupLabel className="flex items-center justify-between text-[#444746] text-md font-light leading-5">
                <span>Document Tabs</span>
                <MenuMaker />
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                <SidebarMenu className="px-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="bg-[#D3E3FD] rounded-full mb-2 text-base font-medium h-[41px] p-[15px]"
                      onClick={() => handleSubmenuToggle(data.id)} // Toggle on parent click
                    >
                      <Link href={data.url}>
                        <ListMinus />
                        <span>{data.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {data.submenu && data.submenu.length > 0 && (
                      <SidebarMenu
                        className={`ml-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                          openSubmenus[data.id] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {data.submenu.map((submenuItem: SubmenuItem) => (
                          <SidebarMenuItem key={submenuItem.id}>
                            <SidebarMenuButton asChild>
                              <a href={submenuItem.url}>
                                <span>{submenuItem.label}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

  );
};
