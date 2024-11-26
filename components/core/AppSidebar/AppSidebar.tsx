"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { MenuMaker } from "./MenuMaker";
import { useState } from "react";
import { EllipsisVertical, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { RenameTab } from "./RenameTab";
import { DeleteTab } from "./DeleteTab";

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
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameItem, setRenameItem] = useState<{ id: number; label: string; url: string; } | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ id: number } | null>(null);
  const [isdeleteopen, setIsdeleteopen] = useState(false);

  if (data.length === 0) {
    data = [
      {
        id: 0,
        label: "Tab1",
        url: "/course?id=tab1",
        bookmark: 0,
        submenu: [],
      },
    ];
  }

  const openDeleteDialog = (id: number) => {
    setDeleteItem({ id });
    setIsdeleteopen(true)
  }

  const closeDeleteDialog = () => {
    setIsdeleteopen(false);
    setDeleteItem(null);
  };

  const openRenameDialog = (id: number, label: string, url: string,) => {
    setRenameItem({ id, label, url });
    setIsRenameOpen(true);
  };

  const closeRenameDialog = () => {
    setIsRenameOpen(false);
    setRenameItem(null);
  };

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
    const updatedBookmarkValue = course.bookmark === 0 ? 1 : 0;
    console.log('Toggled Bookmark Value:', updatedBookmarkValue);

    try {
      const response = await fetch(`/api/tutorials/${dataId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookmark: updatedBookmarkValue }),
      });

      if (response.ok) {
        const updatedCourses = courses.map((course) => {
          if (course.id === dataId) {
            course.bookmark = updatedBookmarkValue;
          }
          return course;
        });
        window.location.reload()
        setCourses(updatedCourses);
      } else {
        console.error("Failed to update bookmark");
      }
    } catch (err) {
      console.error("Error updating bookmark:", err);
    }
  };



  return (
    <Sidebar className="border-none mt-[122px]">
      <SidebarContent className="bg-[#F9FBFD] ">
      <SidebarTrigger className="fixed z-[1] left-[25px] top-[145px]" />
        <SidebarGroup className="relative">
          <div className="mt-[100px]">
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
                        <div className="flex justify-between w-full items-center">
                          <span className="flex gap-3 w-full items-center">
                            <button
                              onClick={() => handleBookmarkToggle(item.id)}
                              className="ml-2"
                            >
                              {item.bookmark === 1 ? (
                                <Heart className="fill-red-500 text-red-500 w-4 h-4" />
                              ) : (
                                <Heart className="text-gray-500 w-4 h-4" />
                              )}
                            </button>
                            <Link href={item.url} className="" onClick={() => handleSubmenuToggle(item.id)}>
                              <span>{item.label}</span>
                            </Link>
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none"><EllipsisVertical className="w-4 h-4" /></DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                              <DropdownMenuItem><button onClick={() => openRenameDialog(item.id, item.label, item.url)} className="w-full text-left">Rename</button></DropdownMenuItem>
                              <DropdownMenuItem><button onClick={() => openDeleteDialog(item.id)} className="w-full text-left">Delete</button></DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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
      {renameItem && (
        <RenameTab
          isOpen={isRenameOpen}
          onClose={closeRenameDialog}
          id={renameItem.id}
          label={renameItem.label}
          url={renameItem.url}
        />
      )}
      {deleteItem && (
        <DeleteTab
          isOpen={isdeleteopen}
          onClose={closeDeleteDialog}
          id={deleteItem.id}
        />
      )}
    </Sidebar>
  );
};
