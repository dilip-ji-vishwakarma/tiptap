"use client"
import React, { useEffect, useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Comment component
export const Comment = () => {
  const [comments, setComments] = useState<any[]>([]);  // State to store comments
  const [error, setError] = useState<string | null>(null);  // State to store any error message

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/getcomment');  // Make API call to fetch comments

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data);  // Set the fetched comments into state
      } catch (error: any) {
        setError(error.message);  // Set error message in case of failure
      }
    };

    fetchComments();
  }, []);  // Empty dependency array ensures this runs once on mount

  return (
    <Sheet>
      <SheetTrigger><MessageSquareText /></SheetTrigger>
      <SheetContent className="bg-[whitesmoke]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Comments</SheetTitle>
          <SheetDescription>
            {error && <p className="text-red-500">{error}</p>}  {/* Display error if any */}

            {/* Display comments in a table format */}
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Text</th>
                  <th className="px-4 py-2 border">Position</th>
                </tr>
              </thead>
              <tbody>
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center">No comments available</td>
                  </tr>
                ) : (
                  comments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="px-4 py-2">{comment.id}</td>
                      <td className="px-4 py-2">{comment.text}</td>
                      <td className="px-4 py-2">{comment.position}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
