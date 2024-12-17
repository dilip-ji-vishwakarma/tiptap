"use client";
import { Heading, Preloader } from '@/components/core';
import React, { useEffect, useState } from 'react';
import { DashboardHeader } from '../DashboardHeader';
import { ScrollText, EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseCreation } from '../CourseCreation';
import { RenameCategory } from '../RenameCategory';
import { DeleteCategory } from '../DeleteCategory';
import { Commet } from 'react-loading-indicators';

type RenameItem = {
  id: number;
  category_name: string;
};

export const CourseCard = () => {
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [renameItem, setRenameItem] = useState<RenameItem | null>(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/category', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setLoading(false);
          setError(errorData.message || 'Failed to fetch categories');
        } else {
          const data = await response.json();

          if (!data.categories || !Array.isArray(data.categories)) {
            throw new Error('Invalid API response');
          }
          setOriginalData(data.categories);
          setFilteredData(data.categories);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching data');
      }
    };

    fetchUserData();
  }, []);

  const openRenameDialog = (item: RenameItem) => {
    setRenameItem(item);
    setIsRenameOpen(true);
  };

  const closeRenameDialog = () => {
    setIsRenameOpen(false);
    setRenameItem(null);
  };

  const openDeleteDialog = (id: number) => {
    setDeleteItem({ id });
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setDeleteItem(null);
  };

  const handleSearch = (results: any[]) => {
    setFilteredData(results);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Commet color="#6B46C1" size="medium" text="" speedPlus={3} textColor="" /></div>;

  return (
    <>
      <DashboardHeader data={originalData} onSearch={handleSearch} />
      <div>
        <CourseCreation />
      </div>
      <div className="container mx-auto space-y-5 mt-5">
        <Heading className="md:text-[17px] md:leading-6">
          Recent documents
        </Heading>
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 mt-5">
            No Recent Courses, create a new one
          </div>
        ) : (
          <div className="md:flex gap-4 md:flex-wrap">
            {filteredData.map((item, index) => (
              <div
                className="overflow-hidden border bg-white text-[#444] rounded-[3px] border-solid border-[#dfe1e5] w-[19%]"
                key={index}
              >
                <div className="p-4 space-y-4 ">
                  <a
                    href={`/course?category_id=${item.id}`}
                    className="text-black text-[18px] font-medium tracking-[0.15px] leading-[18px] align-top whitespace-nowrap ml-0.5 hover:text-[#2684FC]"
                  >
                    {item.category_name}
                  </a>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-[5px] items-center">
                      <span className="bg-[#2684FC] text-white p-[4px] rounded-lg">
                        <ScrollText className="w-[20px]" />
                      </span>
                      <div>
                        <span>Opened </span>
                        <span>{formatDate(item.updated_at)}</span>
                      </div>
                    </div>
                    <span>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <EllipsisVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem>
                            <button
                              onClick={() =>
                                openRenameDialog({
                                  id: item.id,
                                  category_name: item.category_name,
                                })
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
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
      </div>
      {renameItem && (
        <RenameCategory
          isOpen={isRenameOpen}
          onClose={closeRenameDialog}
          id={renameItem.id}
          label={renameItem.category_name}
        />
      )}
      {deleteItem && (
        <DeleteCategory
          isOpen={isDeleteOpen}
          onClose={closeDeleteDialog}
          id={deleteItem.id}
        />
      )}
    </>
  );
};
