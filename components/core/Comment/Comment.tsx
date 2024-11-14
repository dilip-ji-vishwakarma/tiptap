"use client"
import React, { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { InputTextArea } from '../input';
import { useForm } from 'react-hook-form';
import { useEditorContext } from '@/components/TipTapEditor';
import { v4 as uuidv4 } from 'uuid';

export const Comment = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const { currentEditor } = useEditorContext();  // Access editor from context
  const [comments, setComments] = useState({});

  const saveCommentToApi = async ({ commentId, commentData }: any) => {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, ...commentData }),
      });
      if (!response.ok) throw new Error("Failed to save comment");
      console.log("Comment saved successfully");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleAddComment = (data: any) => {
    const commentId = uuidv4(); // Generate a unique ID for the comment
    const commentContent = data.comment_area;
    const selection = currentEditor?.state.selection;

    if (selection && commentContent) {
      // Apply the comment mark with the generated commentId
      currentEditor.chain()
        .focus()
        .setMark('comment', {
          id: commentId, // Pass data-comment-id
          class: 'comment', // Add class as well
        })
        .run();

      // Save comment in component state and to API
      setComments(prev => ({
        ...prev,
        [commentId]: { text: commentContent, position: selection.from },
      }));

      // Save comment to API
      saveCommentToApi({
        commentId,
        commentData: { text: commentContent, position: selection.from },
      });

      reset(); // Clear the form
    }
  };

  return (
    
      <Sheet>
        <SheetTrigger><MessageSquareText /></SheetTrigger>
        <SheetContent className="bg-[whitesmoke]">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Comments</SheetTitle>
            <SheetDescription>
            <form onSubmit={handleSubmit(handleAddComment)} className='space-y-3'>
                <InputTextArea
                  column_name="comment_area"
                  required={true}
                  control={control}
                  errors={errors}
                  label="Enter Comment"
                />
                <button
                  type="submit"
                  className="border cursor-pointer text-lg font-medium h-10 bg-[#0b57d0] text-white px-6 py-2 rounded"
                >
                  Save
                </button>
                </form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
   
  );
};
