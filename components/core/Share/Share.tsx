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
            <DialogTrigger>
                <Button variant="outline" className="flex gap-3 items-center rounded-full bg-[#C2E7FF] border border-solid border-[#C2E7FF]">
                    <LockKeyhole /> Share
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-[whitesmoke] rounded-md'>
                <DialogHeader className='space-y-5'>
                    <DialogTitle>Share Notes</DialogTitle>
                    <DialogDescription className='flex items-center border-[#c7c7c7] border justify-between px-2.5'>
                        <p>{window.location.href}</p>
                        <Button onClick={handleCopyLink} className='shadow-none'>
                            {copy ? <Files /> : <Clipboard />}
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
