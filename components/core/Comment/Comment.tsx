"use client"
import React, { useEffect, useRef, useState } from 'react';
import { MessageSquareText, X } from 'lucide-react';
import { InputTextArea } from '../input';
import { useForm } from 'react-hook-form';
import { useEditorContext } from '@/components/TipTapEditor';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Portal } from '../Portal';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';

export const Comment = () => {
  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    mode: "onChange",
  });
  const { currentEditor } = useEditorContext();
  const [comments, setComments] = useState<any[]>([]);
  const [commentbox, setCommentbox] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close
  const commentBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target)) {
        setCommentbox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/getcomment", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const saveCommentToApi = async ({ commentId, commentData }: any) => {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, ...commentData }),
      });
      if (!response.ok) throw new Error("Failed to save comment");
      console.log("Comment saved successfully");
      fetchComments();
      setCommentbox(false);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleAddComment = (data: any) => {
    const commentId = uuidv4();
    const commentContent = data.comment_area;
    const selection = currentEditor?.state.selection;

    if (selection && commentContent) {
      currentEditor.chain()
        .focus()
        .setMark('comment', {
          id: commentId,
          class: 'comment',
        })
        .run();

      setComments(prev => ({
        ...prev,
        [commentId]: { text: commentContent, position: selection.from },
      }));

      saveCommentToApi({
        commentId,
        commentData: { text: commentContent, position: selection.from },
      });

      reset();
      setDrawerOpen(false); // Close the drawer after submission
    }
  };

  return (
    <>
    <div className='lg:block hidden'>
        <span className='cursor-pointer' onClick={() => setCommentbox(true)}><MessageSquareText /></span>
        <Portal id='comment-portal' >
          <div ref={commentBoxRef}>
            {commentbox ? (

              <div className="bg-[whitesmoke] w-full mt-[15px]" >
                <div className='shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_8px_3px_rgba(0,0,0,0.15)] p-3 rounded-md bg-white space-y-3'>
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
              </div>
            ) : null}
            <div className='space-y-3 mt-12 flex flex-col'>
              {comments.length > 0 && comments.map((comment: any, index) => (
                <Link key={index} href={`#${comment.id}`}>
                  <div key={comment.id} className="comment-item space-y-3 p-3 rounded-md bg-[#EDF2FA]">
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-md'>Dilip Vishwakarma</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Portal>
      </div>
      <div className='lg:hidden leading-[0px]'>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}> {/* Bind state to drawer open */}
          <DrawerTrigger><MessageSquareText /></DrawerTrigger>
          <DrawerContent className='bg-white text-left'>
            <DrawerHeader>
              <div className='flex justify-between items-center'>
              <DrawerTitle>Comment</DrawerTitle>
              <DrawerClose>
        <Button variant="outline"><X /></Button>
      </DrawerClose>
      </div>
              <div className="bg-[whitesmoke] w-full mt-[15px]" >
                <div className='shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_8px_3px_rgba(0,0,0,0.15)] p-3 rounded-md bg-white space-y-3'>
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
              </div>
            </DrawerHeader>
            <DrawerFooter className='overflow-y-scroll'>
              <div className='space-y-3 flex flex-col h-80 '>
                {comments.length > 0 && comments.map((comment: any, index) => (
                  <Link key={index} href={`#${comment.id}`}>
                    <div key={comment.id} className="comment-item space-y-3 p-3 rounded-md bg-[#EDF2FA]">
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className='text-md'>Dilip Vishwakarma</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
