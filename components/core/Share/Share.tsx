"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LockKeyhole } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Clipboard, Files } from 'lucide-react';

export const Share = () => {
    const [copy, setCopy] = useState(false);

    const handleCopyLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopy(true);
            setTimeout(() => setCopy(false), 2000);
        }).catch(err => {
            console.error("Failed to copy link: ", err);
        });
    };

    return (
        <Dialog>
            <DialogTrigger className='flex gap-3 items-center rounded-full bg-[#C2E7FF] border border-solid border-[#C2E7FF] px-3 py-2 text-sm'>

                <LockKeyhole width={20} /> Share

            </DialogTrigger>
            <DialogContent className='bg-[whitesmoke] rounded-md'>
                <DialogHeader className='space-y-5'>
                    <DialogTitle>Share Notes</DialogTitle>
                    <DialogDescription className='flex items-center border-[#c7c7c7] border justify-between p-2.5 '>
                        <p>{window.location.href}</p>
                        <span onClick={handleCopyLink} className='shadow-none cursor-pointer'>
                            {copy ? <Files /> : <Clipboard />}
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
