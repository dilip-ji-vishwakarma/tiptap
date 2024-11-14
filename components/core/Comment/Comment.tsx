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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Comment = () => {
  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    mode: "onChange",  // Ensure form validation happens on each change
  });
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
            <div className='shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_8px_3px_rgba(0,0,0,0.15)] p-3 rounded-md bg-white'>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='text-md'>Dilip Vishwakarma</span>
              </div>
              <form onSubmit={handleSubmit(handleAddComment)} className='space-y-3'>
                <InputTextArea
                  column_name="comment_area"
                  required={true}
                  control={control}
                  errors={errors}
                />
                <button
                  type="submit"
                  className={`border cursor-pointer text-md font-medium h-10   px-6 py-2 rounded-md leading-[0px] ${isValid ? "bg-[#0b57d0] text-white" : "border border-[#0b57d0] text-[#0b57d0] cursor-not-allowed"}`}
                  disabled={!isValid}
                >
                  Comment
                </button>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  );
};
