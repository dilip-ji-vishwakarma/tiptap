"use client"
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
import { useUser } from "@/components/context/UserContext";


type CourseItem = {
  id: number;
  label: string;
  url: string;
  bookmark: number;
};

type AppSidebarProps = {
  data: CourseItem[];
};

export const AppSidebar = ({ data }: AppSidebarProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const [courses, setCourses] = useState(data);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameItem, setRenameItem] = useState<CourseItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ id: number } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editorContent, setEditorContent] = useState<string>(''); // Initialize with an empty string or a default value
const { user } = useUser();
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

  const handleBookmarkToggle = async (dataId: number) => {
    const updatedCourses = courses.map((course) => 
      course.id === dataId
        ? { ...course, bookmark: course.bookmark === 0 ? 1 : 0 }
        : course
    );

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
            bookmark: updatedCourses.find((course) => course.id === dataId)?.bookmark,
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
    <Sidebar className={`border-none   ${user?.role === "admin" ? "mt-[122px]" : "mt-[50px]"}`}>
      <SidebarContent className="bg-[#F9FBFD] ">
        <SidebarTrigger className={`fixed z-[1] left-[25px]  ${user?.role === "admin" ? "top-[145px]" : "top-[100px]"}`} />
        <SidebarGroup className="relative">
          <div className="mt-[100px] ">
            {user?.role === "admin" ? (
            <SidebarGroupLabel className="flex items-center justify-between text-[#444746] text-md font-light leading-5">
              <span>Document Tabs</span>
              <MenuMaker />
            </SidebarGroupLabel>
            ): null}
            {courses.length > 0 ? (
              <SidebarGroupContent className="mt-3 pb-[150px]">
                <SidebarMenu className="px-1 min-h-svh overflow-y-auto">
                  {courses?.map((item, index) => {
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
                                >
                                  <span>{item.label}</span>
                                </Link>
                              </span>
                              {user?.role === "admin" ? (
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
                              ) : null}
                            </div>
                          </div>
                        </SidebarMenuButton>
                        {isActive(item.url) && (
                          <div id="tiptap-toc"></div>
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
