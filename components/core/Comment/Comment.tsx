import React from 'react'
import { MessageSquareText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export const Comment = () => {
  return (
    <Sheet>
      <SheetTrigger><MessageSquareText /></SheetTrigger>
      <SheetContent className='bg-[whitesmoke]'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold'>Comment</SheetTitle>
          <SheetDescription>
            <div className="w-full max-w-2xl mx-auto space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Write your comment..." className="mb-2 resize-none" rows={3} />
                    <Button type="submit" className="ml-auto">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">2 days ago</div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {`This is a great product! I've been using it for a week and it's been a game-changer.`}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">1 week ago</div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {`I'm really impressed with the quality of this product. It's exceeded my expectations.`}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Michael Johnson</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">3 weeks ago</div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {`I've been using this product for a month now and it's been fantastic. Highly recommended!`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
