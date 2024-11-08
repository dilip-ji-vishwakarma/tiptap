import React from 'react'
import { History } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export const HistoryList = () => {
  return (
    <Sheet>
      <SheetTrigger><History /></SheetTrigger>
      <SheetContent className='bg-[whitesmoke]'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold'>Version history</SheetTitle>
          <SheetDescription>
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Productivity</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-primary rounded-full p-2 text-primary-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">Calendar</h4>
                        <p className="text-muted-foreground">Stay on top of your schedule with our powerful calendar.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-secondary rounded-full p-2 text-secondary-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">To-do Lists</h4>
                        <p className="text-muted-foreground">Organize your tasks and stay on top of your work.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-accent rounded-full p-2 text-accent-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">Reminders</h4>
                        <p className="text-muted-foreground">Never forget important deadlines or meetings.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Collaboration</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-primary rounded-full p-2 text-primary-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">Team Sharing</h4>
                        <p className="text-muted-foreground">Easily share documents and collaborate with your team.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-secondary rounded-full p-2 text-secondary-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">Real-time Chat</h4>
                        <p className="text-muted-foreground">Communicate with your team in real-time.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-accent rounded-full p-2 text-accent-foreground">

                      </div>
                      <div>
                        <h4 className="text-base font-medium">File Sharing</h4>
                        <p className="text-muted-foreground">Share and access files from anywhere.</p>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
