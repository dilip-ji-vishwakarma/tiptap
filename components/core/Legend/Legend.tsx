import React from 'react'
import { LayoutList } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export const Legend = () => {
    return (
        <Sheet>
            <SheetTrigger><LayoutList width={22} height={22} /></SheetTrigger>
            <SheetContent className='bg-[whitesmoke]'>
                <SheetHeader>
                    <SheetTitle className='text-2xl font-bold'>Legend</SheetTitle>
                 
                        <div className='inline-grid space-y-2'>
                     
                        <div className="inline-flex items-center">
                            <span className="size-2 inline-block bg-red-500 rounded-full me-2"></span>
                            <span className="text-gray-600 dark:text-neutral-400">Important</span>
                        </div>
                        <div className="inline-flex items-center">
                            <span className="size-2 inline-block bg-yellow-500 rounded-full me-2"></span>
                            <span className="text-gray-600 dark:text-neutral-400">Medium</span>
                        </div>
                        <div className="inline-flex items-center">
                            <span className="size-2 inline-block bg-green-500 rounded-full me-2"></span>
                            <span className="text-gray-600 dark:text-neutral-400">Default</span>
                        </div>
                        </div>
                   
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
