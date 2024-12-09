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
import { useState } from "react";
import { EllipsisVertical, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameTab } from "./RenameTab";
import { DeleteTab } from "./DeleteTab";

type SubmenuItem = {
  id: number;
  course_id: number;
  label: string;
  url: string;
  template: string;
  editor_string: any;
  bookmark: number;
};

type CourseItem = {
  id: number;
  label: string;
  url: string;
  bookmark: number;
  submenus?: SubmenuItem[];
};


type AppSidebarProps = {
  data: CourseItem[];
};

export const AppSidebar = ({ data }: AppSidebarProps) => {
  console.log(data, "data")
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");

  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);
  const [courses, setCourses] = useState(data);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameItem, setRenameItem] = useState<CourseItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ id: number } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteDialog = (id: number) => {
    setDeleteItem({ id });
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setDeleteItem(null);
  };

  const openRenameDialog = (id: number, label: string, url: string, bookmark: number) => {
    setRenameItem({ id, label, url, bookmark });
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
    const url = new URL(itemUrl, window.location.origin);
    const itemPath = url.pathname;
    const itemQuery = new URLSearchParams(url.search);

    const currentPath = pathName;
    const currentQuery = new URLSearchParams(window.location.search);

    return (
      currentPath === itemPath &&
      [...itemQuery.entries()].every(([key, value]) => currentQuery.get(key) === value)
    );
  };


  const handleBookmarkToggle = async (dataId: number, isSubmenu: boolean = false) => {
    const updatedCourses = courses.map((course) => {
      if (isSubmenu) {
        const updatedSubmenus = course.submenus?.map((submenu) =>
          submenu.id === dataId
            ? { ...submenu, bookmark: course.bookmark === 0 ? 1 : 0 }
            : submenu
        );
        return { ...course, submenus: updatedSubmenus };
      }
      return course.id === dataId
        ? { ...course, bookmark: course.bookmark === 0 ? 1 : 0 }
        : course;
    });

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `/api/petchcourses?category_id=${categoryId}&id=${dataId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookmark: isSubmenu
              ? updatedCourses
                .flatMap((course) => course.submenus || [])
                .find((submenu) => submenu.id === dataId)?.bookmark
              : updatedCourses.find((course) => course.id === dataId)?.bookmark,
          }),
        }
      );

      if (response.ok) {
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
          <div className="mt-[100px] ">
            <SidebarGroupLabel className="flex items-center justify-between text-[#444746] text-md font-light leading-5">
              <span>Document Tabs</span>
              <MenuMaker />
            </SidebarGroupLabel>
            {courses.length > 0 ? (
              <SidebarGroupContent className="mt-3 pb-[150px]">
                <SidebarMenu className="px-1 min-h-svh overflow-y-auto">
                  {courses?.map((item, index) => {
                    console.log(item.url);
                    return (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          asChild
                          className={`rounded-full mb-2 text-base font-medium h-[41px] p-[15px] ${isActive(item.url) ? "bg-[#D3E3FD]" : "bg-[#F4F4F5]"
                            }`}
                        >
                          <div>
                            <div className="flex justify-between w-full items-center">
                              <span className="flex gap-3 w-full items-center">
                                <button
                                  onClick={() => handleBookmarkToggle(item.id)}
                                  className={`ml-2 ${item.id}`}
                                >
                                  {item.bookmark === 1 ? (
                                    <Heart className="fill-red-500 text-red-500 w-4 h-4" />
                                  ) : (
                                    <Heart className="text-gray-500 w-4 h-4" />
                                  )}
                                </button>
                                <Link
                                  href={item.url}
                                  className=""
                                  onClick={() => handleSubmenuToggle(item.id)}
                                >
                                  <span>{item.label}</span>
                                </Link>
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                  <EllipsisVertical className="w-4 h-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white">
                                  <DropdownMenuItem>
                                    <button
                                      onClick={() =>
                                        openRenameDialog(item.id, item.label, item.url, item.bookmark)
                                      }
                                      className="w-full text-left"
                                    >
                                      Rename
                                    </button>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <button
                                      onClick={() => openDeleteDialog(item.id)}
                                      className="w-full text-left"
                                    >
                                      Delete
                                    </button>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                          </div>
                        </SidebarMenuButton>
                        {item.submenus && item.submenus.length > 0 && (
                          <SidebarMenu
                            className={`ml-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openSubmenuId === item.id
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                              }`}
                          >
                            {item.submenus.map((submenuItem) => (
                              <SidebarMenuItem key={submenuItem.id}>
                                <SidebarMenuButton asChild>
                                  <div className="flex justify-between w-full items-center">
                                    <span className="flex gap-3 w-full items-center">
                                      <button
                                        onClick={() => handleBookmarkToggle(submenuItem.id, true)}
                                        className={`ml-2 ${submenuItem.id}`}
                                      >
                                        {submenuItem.bookmark ? (
                                          <Heart className="fill-red-500 text-red-500 w-4 h-4" />
                                        ) : (
                                          <Heart className="text-gray-500 w-4 h-4" />
                                        )}
                                      </button>
                                      <Link
                                        href={submenuItem.url}
                                        className=""
                                        onClick={() => handleSubmenuToggle(submenuItem.id)}
                                      >
                                        <span>{submenuItem.label}</span>
                                      </Link>
                                    </span>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger className="focus:outline-none">
                                        <EllipsisVertical className="w-4 h-4" />
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent className="bg-white">
                                        <DropdownMenuItem>
                                          <button
                                            onClick={() =>
                                              openRenameDialog(submenuItem.id, submenuItem.label, submenuItem.url, submenuItem.bookmark)
                                            }
                                            className="w-full text-left"
                                          >
                                            Rename
                                          </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <button
                                            onClick={() => openDeleteDialog(submenuItem.id)}
                                            className="w-full text-left"
                                          >
                                            Delete
                                          </button>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            ) : null}
          </div>
        </SidebarGroup>
      </SidebarContent>
      {renameItem && (
        <RenameTab
          isOpen={isRenameOpen}
          onClose={closeRenameDialog}
          id={renameItem.id}
          label={renameItem.label}
        />
      )}
      {deleteItem && (
        <DeleteTab
          isOpen={isDeleteOpen}
          onClose={closeDeleteDialog}
          id={deleteItem.id}
        />
      )}
    </Sidebar>
  );
};
