"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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

type MenuTabProps = {
  data: TutorialItem[];
};

export const MenuTab = ({ data }: MenuTabProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  // Navigate to the current item's URL whenever the index changes
  useEffect(() => {
    if (data[currentIndex]?.url) {
      router.push(data[currentIndex].url);
    }
  }, [currentIndex, data, router]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0));
  };

  const handleLabelClick = () => {
    setDrawerOpen(true);
  };

  if (data.length === 0) {
    return <div className="text-center text-red-500 font-semibold">Warning: No data available</div>;
  }

  const currentItem = data[currentIndex];
  const submenuCount = currentItem.submenu ? currentItem.submenu.length : 0;

  return (
    <>
      <div className="flex items-center justify-between px-2 py-2 bg-gray-100 rounded-md shadow">
        {/* Left Arrow */}
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Center Content */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleLabelClick} // Open drawer on label click
        >
          <div className="text-lg font-semibold text-gray-800">{currentItem.label}</div>
          <div className="text-sm text-gray-600">{submenuCount} Submenus</div>
        </div>

        {/* Right Arrow */}
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={handleNext}
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Drawer for displaying all menus */}
      <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle>All Menus</DrawerTitle>
            <DrawerDescription>Select a menu or submenu item below:</DrawerDescription>
            <DrawerClose />
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {data.map((item, index) => (
              <div key={item.id} className="space-y-2">
                {/* Main Menu Item */}
                <div
                  className="cursor-pointer p-2 hover:bg-gray-200 rounded-md font-semibold"
                  onClick={() => {
                    setCurrentIndex(index);
                    setDrawerOpen(false); // Close the drawer after selection
                  }}
                >
                  {item.label}
                </div>

                {/* Submenu Items */}
                {item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((submenuItem) => (
                      <div
                        key={submenuItem.id}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                        onClick={() => {
                          router.push(submenuItem.url);
                          setDrawerOpen(false); // Close the drawer after navigation
                        }}
                      >
                        {submenuItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <DrawerFooter>
            <button
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
